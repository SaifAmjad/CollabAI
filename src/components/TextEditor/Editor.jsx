import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import FloatingAIAction from "./FloatingAIAction";
import Ably from "ably";
import { fetchTextGeneration } from "../../services/aiGeneration";
import throttle from "lodash/throttle";


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const EditorField = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [loading, setLoading] = useState(false);
  const [AITextChange, setAITextChange] = useState(false);
  const [channel, setChannel] = useState();
  const { id } = useParams();

  useEffect(() => {
    const ably = new Ably.Realtime({
      key: import.meta.env.VITE_ABLY_KEY,
      clientId: crypto.randomUUID(),
    });
    const docChannel = ably.channels.get(`document-${id}`);
    setChannel(docChannel);

    return () => {
      ably.close();
    };
  }, [id]);

  useEffect(() => {
    if (quill == null || channel == null) return;


    const loadDocument = async () => {
      const res = await fetch(`https://collabaidoc.vercel.app/api/load-document/${id}`);
      const { data } = await res.json();
      quill.setContents(data);
      quill.enable();
    };

    loadDocument();
  }, [quill, channel, id]);

  useEffect(() => {
    if (quill == null || channel == null) return;

    const handleReceiveChange = (msg) => {
      const delta = msg.data;
      console.log("🟡 Received delta from other instance:", msg);
      if (msg.clientId === ably.auth.clientId) return;
      quill.updateContents(delta);
    };

    channel.subscribe("receive-changes", handleReceiveChange);

    return () => {
      channel.unsubscribe("receive-changes", handleReceiveChange);
    };
  }, [quill, channel]);

  useEffect(() => {
    if (quill == null || channel == null) return;

    const handleTextChange = throttle((delta, oldDelta, source) => {
      // if (source !== "user") return;
      console.log("🟢 Publishing delta:", delta);
      channel.publish("receive-changes", delta);
    }, 100);

    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
    };
  }, [quill, channel, AITextChange]);

  useEffect(() => {
    if (quill == null || channel == null) return;

    const interval = setInterval(() => {
      const contents = quill.getContents();
      channel.publish("save-changes", contents);
    }, 2000);

    return () => clearInterval(interval);
  }, [quill, channel, AITextChange]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quilInstance = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quilInstance.disable();
    quilInstance.setText("Loading...");
    setQuill(quilInstance);
  }, []);

  const handleTextOperation = async (operation) => {
    quill.root.innerHTML = ` <p class="loading-line w-3/4 h-4 bg-gray-300 rounded animate-pulse mb-1"></p> <p class="loading-line w-1/2 h-4 bg-gray-300 rounded animate-pulse mb-1"></p> <p class="loading-line w-full h-4 bg-gray-300 rounded animate-pulse mb-1"></p> <p class="loading-line w-1/2 h-4 bg-gray-300 rounded animate-pulse"></p>
    `;
    setLoading(true);
    try {
      const response = await fetchTextGeneration(quill.getText(), operation);

      if (response.success) {
        setAITextChange(true);
        quill.clipboard.dangerouslyPasteHTML(response.text);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FloatingAIAction
        handleTextOperation={handleTextOperation}
        loading={loading}
      />
      <div
        id="editor"
        className="quil-container min-h-full sm:h-screen bg-white"
        ref={wrapperRef}
      ></div>
    </>
  );
};

export default EditorField;
