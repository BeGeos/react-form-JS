import React, { useRef } from "react";

// Import utils
import { getClassName, getIcon } from "../../utils/utils.form";

// helper function
const checkUsername = (username) => {
  return username.trim().length >= 6 && !username.match(/\s+/);
};

export default function UsernameField({ status, setStatus }) {
  const username = useRef("");

  return (
    <div className="form__input">
      <label htmlFor="username" className="small">
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        onChange={(e) => {
          username.current = e.target.value;
          if (checkUsername(username.current)) {
            // Triggers a re-render only when this becomes true
            return setStatus("valid");
          }
          return setStatus("");
        }}
      />
      <div className={getClassName(status)}>
        {getIcon(status)}
        <span>At least 6 characters</span>
      </div>
    </div>
  );
}
