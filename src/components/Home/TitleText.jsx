import React, { useEffect, useState } from "react";

const TitleText = () => {
  const fullText = "Collaborative AI document editor on the go";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        {displayedText.split("editor")[0]}
        <strong className="text-sky-500">
          {displayedText.includes("editor") && "editor"}
        </strong>
        {displayedText.split("editor")[1] ?? ""}
        <span className="animate-pulse text-sky-500">|</span>
      </h1>
    </>
  );
};

export default TitleText;
