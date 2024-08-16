import axios from "axios";

const ip = "domain";
const port = 8031;
const apiUrl = "http://" + ip + ":" + port;
const loginUrl = apiUrl + "/user/login";

export default login = async (token) => {
  try {
    const response = await axios.post(loginUrl, {
      token: token,
    });
    console.log(response);
    //   const responseJson = response.json();

    return response;
  } catch (e) {
    console.log("Error: " + e);
  }
};
