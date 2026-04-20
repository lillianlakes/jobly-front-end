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
    <div className="page-shell auth-page-shell">
      <div className="page-header auth-page-header">
        <p className="page-kicker">Welcome back</p>
        <h1 className="page-title">Log In</h1>
        <p className="page-subtitle">Jump back in to browse companies, apply to roles, and track your applications.</p>
      </div>

      <div className="auth-card card content-card">
        <div className="card-body auth-card-body">
          <form className="LoginForm LoginForm-formfields" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className="form-control auth-input"
                placeholder="Enter your username"
                onChange={handleChange}
                value={formData.username}
                aria-label="username"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control auth-input"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
                aria-label="password"
                autoComplete="current-password"
                required
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            <button className="btn-primary btn btn-md auth-submit-btn LoginForm-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
