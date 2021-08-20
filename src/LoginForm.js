import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';


/** Form for logging in.
 *
 * Props:
 * - initialFormData
 * - logIn: function to call in parent.
 *
 * App -> Routes -> LoginForm
 */

const defaultInitialFormData = { username: "", password: "" }; // make this all caps for truly unchanging global var

function LoginForm({ initialFormData = defaultInitialFormData, logIn }) {
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();


  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
  }

  /** Call parent function, clear form, and redirect user to /companies. */
  async function handleSubmit(evt) { // think about a try/catch for bad logIn (don't clear form data/give feedback)
    evt.preventDefault();
    await logIn(formData);
    setFormData(initialFormData); // this is unnecessary due to the redirect, so can get rid of, but not bad to leave it
    history.push("/companies");
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
            type="password"
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
