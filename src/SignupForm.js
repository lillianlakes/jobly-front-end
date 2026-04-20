import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./SignupForm.css"
import Alert from "./Alert";

/** Form for signing up.
 *
 * Props:
 * - initialFormData
 * - register: function to call in parent.
 *
 * App -> Routes -> SignupForm
 */

const defaultInitialFormData = { username: "", password: "", firstName: "", lastName: "", email: "" };

function SignupForm({ initialFormData = defaultInitialFormData, register }) {
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

  /** Call parent function, clear form, redirect user to /companies. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await register(formData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    
    setFormData(initialFormData);
    setFormErrors([]);
    history.push("/companies");
  }

  return (
    <div className="page-shell auth-page-shell">
      <div className="page-header auth-page-header">
        <p className="page-kicker">Join the network</p>
        <h1 className="page-title">Sign Up</h1>
        <p className="page-subtitle">Create an account and start exploring opportunities with a polished, guided signup flow.</p>
      </div>

      <div className="auth-card card content-card">
        <div className="card-body auth-card-body">
          <form className="SignupForm SignupForm-formfields" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className="form-control auth-input"
                placeholder="Enter a username"
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
                placeholder="Create a password"
                onChange={handleChange}
                value={formData.password}
                aria-label="password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                className="form-control auth-input"
                placeholder="First name"
                onChange={handleChange}
                value={formData.firstName}
                aria-label="firstName"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                className="form-control auth-input"
                placeholder="Last name"
                onChange={handleChange}
                value={formData.lastName}
                aria-label="lastName"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="form-control auth-input"
                placeholder="name@example.com"
                onChange={handleChange}
                value={formData.email}
                aria-label="email"
                autoComplete="email"
                required
              />
            </div>

            {formErrors.length
                      ? <Alert type="danger" messages={formErrors} />
                      : null}

            <button className="btn-primary btn btn-md auth-submit-btn SignupForm-btn">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;