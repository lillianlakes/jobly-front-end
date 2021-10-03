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
    <div className="SignupForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h1>Sign Up</h1>
      <form className="SignupForm-formfields" onSubmit={handleSubmit}>
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

        <div className="form-group">
          <input
            id="firstName"
            name="firstName"
            className="form-control"
            placeholder="firstName"
            onChange={handleChange}
            value={formData.firstName}
            aria-label="firstName"
            required
          />
        </div>

        <div className="form-group">
          <input
            id="lastName"
            name="lastName"
            className="form-control"
            placeholder="lastName"
            onChange={handleChange}
            value={formData.lastName}
            aria-label="lastName"
            required
          />
        </div>

        <div className="form-group">
          <input
            id="email"
            name="email"
            className="form-control"
            placeholder="email"
            onChange={handleChange}
            value={formData.email}
            aria-label="email"
            required
          />
        </div>

        {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

        <button className="btn-primary btn btn-md SignupForm-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupForm;