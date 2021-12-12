import React, { useRef } from "react";

// Import utils
import { getClassName, getIcon } from "../../utils/utils.form";

// helper function
const checkEmail = (email) => {
  let regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i");
  return email.match(regexp);
};

export default function EmailField({ status, setStatus }) {
  const email = useRef("");
  return (
    <div className="form__input">
      <label htmlFor="email" className="small">
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="yourEmail@mail.com"
        onChange={(e) => {
          email.current = e.target.value;
          if (checkEmail(email.current)) {
            return setStatus("valid");
          }
          return setStatus("");
        }}
      />
      <div className={getClassName(status)}>
        {getIcon(status)}
        <span>Email is valid</span>
      </div>
    </div>
  );
}
