import React, { useState, useRef, useCallback } from "react";

// Import components
import UsernameField from "../components/UsernameField";
import EmailField from "../components/EmailField";
import PasswordField from "./PasswordField";
import FormFooter from "./FormFooter";
import SuccessView from "./SuccessView";

const Form = () => {
  // States
  const [usernameStatus, setUsernameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({});
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  // Ref
  const isFormValid = useRef(true);

  // Check if form is valid
  const validateForm = useCallback(
    (e) => {
      e.preventDefault();
      isFormValid.current = true;

      if (usernameStatus !== "valid") {
        setUsernameStatus("invalid");
        isFormValid.current = false;
      }

      if (emailStatus !== "valid") {
        setEmailStatus("invalid");
        isFormValid.current = false;
      }

      if (confirmPasswordStatus !== "valid") {
        setConfirmPasswordStatus("invalid");
        isFormValid.current = false;
      }
      // Composing a new object for the password status and setting it --> triggers re-render
      setPasswordStatus((prev) => {
        return {
          charCheck: prev.charCheck === "valid" ? "valid" : "invalid",
          numCheck: prev.numCheck === "valid" ? "valid" : "invalid",
          symCheck: prev.symCheck === "valid" ? "valid" : "invalid",
          spaceCheck: prev.spaceCheck === "valid" ? "valid" : "invalid",
          lenCheck: prev.lenCheck === "valid" ? "valid" : "invalid",
        };
      });

      for (const value in Object.values(passwordStatus)) {
        if (value === "invalid") {
          isFormValid.current = false;
          break;
        }
      }
      if (isFormValid.current) {
        // Show success view
        setShowSuccess(true);
        return console.log("Success");
      }
      console.log("Failed");
      return;
    },
    [confirmPasswordStatus, emailStatus, passwordStatus, usernameStatus]
  );

  return (
    <form onSubmit={validateForm}>
      <div className="form__header">
        <h2>Fill in your credentials</h2>
      </div>
      <div className="form__body">
        <UsernameField setStatus={setUsernameStatus} status={usernameStatus} />
        <EmailField setStatus={setEmailStatus} status={emailStatus} />
        <PasswordField
          setStatus={setPasswordStatus}
          status={passwordStatus}
          confirm={true}
          setConfirmStatus={setConfirmPasswordStatus}
          confirmStatus={confirmPasswordStatus}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
      <FormFooter />
      {showSuccess ? <SuccessView /> : ""}
    </form>
  );
};

export default Form;
