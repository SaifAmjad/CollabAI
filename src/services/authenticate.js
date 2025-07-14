import axios from "axios";

const host = "https://collabaidoc.vercel.app";
// const host="http://localhost:5000"
const postUser = async (data) => {
  try {
    const response = await axios.post(`${host}/v2/authenticate`, {
      user: data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { postUser };
