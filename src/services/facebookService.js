const axios = require("axios");
const config = require("../../config");

// Function to fetch user name from Facebook
exports.fetchUserName = (userId) => {
  return axios
    .get(
      `https://graph.facebook.com/v13.0/${userId}?access_token=${config.facebookPageAccessToken}`
    )
    .then((response) => {
      if (
        response.data &&
        response.data.first_name &&
        response.data.last_name
      ) {
        const name = `${response.data.first_name} ${response.data.last_name}`;
        const profile_pic = response.data.profile_pic || "";
        return { name, profile_pic };
      } else {
        throw new Error("No name found for this user");
      }
    })
    .catch((error) => {
      throw new Error(
        `Failed to fetch user name: ${
          error.response ? error.response.data.error.message : error.message
        }`
      );
    });
};
