import axios from "axios";

const apiUrl = "http://localhost:8031";
// const loginUrl = apiUrl + "/user/login";

export default login = async (token) => {
  try {
    console.log("Token: " + token);
    console.log("URL: " + loginUrl);
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
