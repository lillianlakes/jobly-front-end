import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";
import Alert from "./Alert";


/** Form for logging in.
 *
 * Props:
 * - initialFormData
 * - logIn: function to call in parent.
 *
 * App -> Routes -> LoginForm
 */

const defaultInitialFormData = { username: "", password: "" }; 

function LoginForm({ initialFormData = defaultInitialFormData, logIn }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();


  /** Update form input. */
  function handleChange(evt) {
    const input = evt.target;
    setFormData(formData => ({
      ...formData,
      [input.name]: input.value,
    }));
    setFormErrors([]);
  }

  /** Call parent function, clear form, and redirect user to /companies. */
  async function handleSubmit(evt) { 
    evt.preventDefault();
    
    try {
      await logIn(formData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(initialFormData);
    history.push("/companies");
  }

  return (
    <div className="LoginForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
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

        {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

        <button className="btn-primary btn btn-md LoginForm-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
