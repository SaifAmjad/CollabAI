import axios from "axios";

const host="https://collabaidoc.vercel.app"
// const host="http://localhost:5000"

const fetchTextGeneration=async(text,url)=>{
    try {
        const response = await axios.post(`${host}/v2/ai/${url}`, {
            content:text,
          });
         
        return response.data;
    } catch (error) {
        return error;
    }
}

export {fetchTextGeneration}