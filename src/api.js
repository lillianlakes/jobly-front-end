import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = JSON.parse(localStorage.getItem("token")) || null;

  // get request for companies or jobs
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Log in user given a username and password and get a token */
  static async login(username, password) {
    let res = await this.request(`auth/token`,
      { "username": username, "password": password },
      "post");
    JoblyApi.token = res.token;

    console.log(`res.token `, res.token);
    console.log(`right after login, localStorage `, localStorage);

    return JoblyApi.token;
  }

  /** Register user given a username, password, firstName, lastName, and email,
   *  then return a token */
  static async register(username, password, firstName, lastName, email) {
    let res = await this.request(`auth/register`,
      {
        "username": username,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      },
      "post");
    JoblyApi.token = res.token;
    return JoblyApi.token;
  }

  /** Get the current user given a valid username and token */
  static async getCurrentUser(username) {
    console.log(username, "USERNAME INSIDE GETCURRENTUSER")
    let res = await this.request(`users/${username}`)
    return res.user;
  }

    /** Save user profile page. */

    static async saveProfile(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    }

}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;