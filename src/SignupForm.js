import React, { useState } from "react";

/** Form for signin up.
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
    register(formData); 
    // update our UserContext ????
    setFormData(initialFormData);
  }

  return (
      <div className="SignupForm">
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

          <button className="btn-primary rig btn btn-sm SignupForm-btn">
            Submit
          </button>
      </form>
      </div>
  );
}

export default SignupForm;