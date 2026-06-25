import classes from "./signup.module.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";

export default function Signup({
  loginSwitch,
  closeSignup,
  setVerificationMsg,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function formHandler(e) {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredentials.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredentials.user);

      await signOut(auth);

      setVerificationMsg(
        "Verification email sent. Please check your inbox before logging in.",
      );

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");

      closeSignup();
      loginSwitch();

      console.log(userCredentials.user);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setErrorMessage("user already exists");
      } else if (error.code == "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters.");
      } else {
        setErrorMessage("Error");
      }
    }
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeSignup}></div>
      <form className={classes.signupDiv} onSubmit={formHandler}>
        <div className={classes.field}>
          <label>User Name</label>
          <input
            required
            placeholder="Enter Your Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label>Phone Number</label>
          <input
            required
            placeholder="1234567890"
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <div className={classes.action}>
          <p className={classes.erroMsg}>{errorMessage}</p>

          <button className={classes.signupButton}>SignUp</button>
        </div>
        <a className={classes.p}>
          Already have an account?
          <span className={classes.haveAcc} onClick={loginSwitch}>
            Login
          </span>
        </a>
      </form>
    </>
  );
}
