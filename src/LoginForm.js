import React, { useContext, useState } from "react";
// import UserContext from "./UserContext"; ????

/** Form for logging in.
 *
 * Props:
 * - initialFormData
 * - login: function to call in parent.
 *
 * App -> Routes -> LoginForm
 */

const defaultInitialFormData = { username: "", password: "" };

function LoginForm({ initialFormData = defaultInitialFormData, login }) {
  const [formData, setFormData] = useState(initialFormData);
  // const {currentUser} = useContext(UserContext); ????

  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    // update our UserContext ????
    setFormData(initialFormData);
  }

  return (
      <div className="LoginForm">
      <h1>Log In</h1>
      <form className="LoginForm-formfields" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
              id="username"
              name="username"
              className="form-control"
              placeholder="username"
              onChange={handleChange}
              value={formData.username}
              aria-label="username"
              required
          />
        </div>

        <div className="form-group">
          <input
              id="password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
              value={formData.password}
              aria-label="password"
              required
          />
        </div>

          <button className="btn-primary rig btn btn-sm LoginForm-btn">
            Submit
          </button>
      </form>
      </div>
  );
}

export default LoginForm;
