import classes from "./login.module.css";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";

export default function Login({
  onClose,
  onSignup,
  verificationMsg,
  setVerificationMsg,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loginHandler(e) {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await userCredentials.user.reload();

      if (!userCredentials.user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth);

        return;
      }

      // console.log(userCredentials.user);
      setError("");
      setEmail("");
      setPassword("");
      setError("");
      setVerificationMsg("");

      onClose();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("invalid email or password");
      } else if (error.code === "auth/user-not-found") {
        setError("user doesnot exist");
      } else if (error.code === "auth/wrong-password") {
        setError("wrong password");
      } else if (error.code === "auth/invalid-email") {
        setError("wrong email");
      } else {
        setError(error.message);
      }
    }
  }

  async function forgotPassword() {
    if (!email) {
      setError("please provide email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("");

      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <form className={classes.loginDiv} onSubmit={loginHandler}>
        <div className={classes.field}>
          <label>Email id</label>
          <input
            required
            placeholder="abc@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={classes.field}>
          <label>Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={classes.actions}>
          <p className={classes.errorMsg}>{error}</p>
          <p className={classes.successMsg}>{success}</p>
          {verificationMsg && (
            <p className={classes.successMsg}>{verificationMsg}</p>
          )}

          <button className={classes.loginButton}>Login</button>
        </div>

        <div className={classes.actions}>
          <a className={classes.p} onClick={onSignup}>
            Dont have an account?
          </a>

          <p className={classes.p} onClick={forgotPassword}>
            Forgot Password?
          </p>
        </div>

        {/* <p>already have a account?</p> */}
      </form>
    </>
  );
}
