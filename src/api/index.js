const BASE_URL = "https://betting-api-a5u0.onrender.com";
import axios from "axios";

export class AuthApis {
  async signupUser(payload) {
    try {
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/create-user`,
        payload,
        {
          withCredentials: true,
        }
      );
      const result = await response.data;
      return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }

  async verifyAccount(payload) {
    try {
      const token = JSON.parse(localStorage.getItem("VT"));
      console.log(token);
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/verify-user`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async requestNewOTP() {
    try {
      const token = JSON.parse(localStorage.getItem("VT"));

      const response = await axios.get(
        `${BASE_URL}/yusuf_atlantis/api/v1/request/otp/verify/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async authenticator() {
    try {
      const token = JSON.parse(localStorage.getItem("LT"));
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/yusuf_atlantis/api/v1/user/authorization`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.data;
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async loginUser(payload) {
    try {
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/login-user`,
        payload,
        { withCredentials: true }
      );
      const result = await response.data;
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
