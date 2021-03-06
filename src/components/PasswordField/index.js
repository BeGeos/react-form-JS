import React, { useRef, useState } from "react";

// Import utils
import { getClassName, getIcon } from "../../utils/utils.form";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Eye/Eye-slash icon
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// helper function
const checkPassword = (password) => {
  let charRegexp = new RegExp(/\w+/);
  let numRegexp = new RegExp(/\d+/);
  let symRegexp = new RegExp(/\W+/);
  let spaceRegexp = new RegExp(/\s+/);

  let output = {
    validChar: password.match(charRegexp),
    validNum: password.match(numRegexp),
    validSym: password.match(symRegexp),
    validSpace: !password.match(spaceRegexp),
    validLen: password.trim().length >= 8,
  };

  return output;
};

const passwordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export default function PasswordField({
  status,
  setStatus,
  confirm,
  confirmStatus,
  setConfirmStatus,
}) {
  const password = useRef("");
  const confirmPassword = useRef("");

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
      <div className="form__input">
        <label htmlFor="password" className="small">
          Password
        </label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => {
            password.current = e.target.value;
            let check = checkPassword(password.current);
            let status = {
              charCheck: check.validChar ? "valid" : "",
              numCheck: check.validNum ? "valid" : "",
              symCheck: check.validSym ? "valid" : "",
              spaceCheck: check.validSpace ? "valid" : "",
              lenCheck: check.validLen ? "valid" : "",
            };
            // If spaces are included in the password just return
            if (!status.spaceCheck) return;

            setStatus(status);

            if (
              confirmPassword.current !== "" &&
              !passwordMatch(password.current, confirmPassword.current)
            ) {
              setConfirmStatus("");
            } else if (
              confirmPassword.current !== "" &&
              passwordMatch(password.current, confirmPassword.current)
            ) {
              setConfirmStatus("valid");
            }
          }}
        />
        <span
          className="reveal-password"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
        </span>
        <div className={getClassName(status.lenCheck)}>
          {getIcon(status.lenCheck)}
          <span>At least 8 characters</span>
        </div>
        <div className={getClassName(status.charCheck)}>
          {getIcon(status.charCheck)}
          <span>Must contain letters</span>
        </div>
        <div className={getClassName(status.numCheck)}>
          {getIcon(status.numCheck)}
          <span>Must contain numbers</span>
        </div>
        <div className={getClassName(status.symCheck)}>
          {getIcon(status.symCheck)}
          <span>Must contain symbols</span>
        </div>
      </div>
      {confirm ? (
        <div className="form__input">
          <label htmlFor="confirm-password" className="small">
            Confirm Password
          </label>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            onChange={(e) => {
              confirmPassword.current = e.target.value;
              if (passwordMatch(password.current, confirmPassword.current)) {
                return setConfirmStatus("valid");
              }
              return setConfirmStatus("");
            }}
          />
          <span
            className="reveal-password"
            onClick={() => setConfirmPasswordVisible((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
            />
          </span>
          <div className={getClassName(confirmStatus)}>
            {getIcon(confirmStatus)}
            <span>Passwords match</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
