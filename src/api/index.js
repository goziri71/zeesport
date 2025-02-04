import axios from "axios";
const BASE_URL = "https://betting-api-a5u0.onrender.com";

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

  async resetPassword(payload) {
    try {
      console.log("payload: " + payload);
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/update/password/user`,
        { email: payload }
      );
      console.log(response);
      const result = await response.data;
      return result;
    } catch (error) {
      console.log(error.message);
      return error.response.data;
    }
  }

  async updatePassword(payload, id, token) {
    try {
      const response = await axios.patch(
        `${BASE_URL}/yusuf_atlantis/api/v1/reset/password/user/${id}/${token}`,
        { password: payload }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getOdds(date, league) {
    try {
      const token = JSON.parse(localStorage.getItem("LT"));
      const response = await axios.get(
        `${BASE_URL}/yusuf_atlantis/api/v1/fixtures/games/odds/live?date=${date}&league=${league}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            private_key: "yniw9u17d3has3fpoglqj52k",
            username: "jenomy79",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async handleOnline(data) {
    try {
      const { fixtureId, selection, games, odd, stake } = data;
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/book-bet`,
        {
          fixtureId,
          selection,
          games,
          stake,
          odd,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("LT"))}`,
          },
        }
      );

      console.log(response.data);
      const res = await response.data;
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async handleOffline(data) {
    try {
      const { fixtureId, selection, games, odd, stake } = data;
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/book-bet/offline`,
        {
          fixtureId,
          selection,
          games,
          stake,
          odd,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("LT"))}`,
          },
        }
      );

      console.log(response.data);
      const res = await response.data;
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async handleBookingCode(bookingCode) {
    try {
      const response = await axios.post(
        `${BASE_URL}/yusuf_atlantis/api/v1/game/ticketId/offline`,
        { bookingId: bookingCode }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(`Booking Offline error Message ${error}`);
      return error;
    }
  }
}
