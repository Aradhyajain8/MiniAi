import { useRef, useState } from "react";
import Login from "../login/signup/login";
import classes from "./Main.module.css";
import Signup from "../login/signup/signup";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiArrowNarrowUp } from "react-icons/hi";
import Microphone from "./microphone";

export default function Main({ user, loading, menuCollapse, setMenuCollapse }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [verificationMsg, setVerificationMsg] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");

  const [isListening, setIsListening] = useState(false);

  const textAreaRef = useRef(null);

  const fileInputRef = useRef(null);

  function openLogin() {
    setShowLogin(true);
    setShowSignup(false);
  }

  function openSignup() {
    setShowSignup(true);
    setShowLogin(false);
  }

  function closeLogin() {
    setShowLogin(false);
  }

  function closeSignup() {
    setShowSignup(false);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    console.log(file);
  }

  function openFilePicker() {
    fileInputRef.current.click();
  }

  function handleInput(e) {
    setPrompt(e.target.value);

    const textarea = textAreaRef.current;
    // console.log(JSON.stringify(e.target.value));
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  return (
    <div className={`${classes.main} ${menuCollapse ? classes.hideMain : ""}`}>
      <div className={classes.nav}>
        <p>MiniAi</p>
        {!loading &&
          (user ? (
            <p className={classes.profile}> {user.email[0].toUpperCase()}</p>
          ) : (
            <button className={classes.login} onClick={openLogin}>
              Login/SignUp
            </button>
          ))}
        {/* <CgProfile/> */}
      </div>

      {showLogin && (
        <Login
          onClose={closeLogin}
          onSignup={openSignup}
          setVerificationMsg={setVerificationMsg}
          verificationMsg={verificationMsg}
        />
      )}
      {showSignup && (
        <Signup
          loginSwitch={openLogin}
          closeSignup={closeSignup}
          setVerificationMsg={setVerificationMsg}
        />
      )}

      <div className={classes.mainContainer}>
        <div className={classes.greet}>
          <p>
            <span>Hello {user && user.displayName.split(" ")[0]}! </span>
          </p>
          <h1>How can i help you today?</h1>
        </div>

        <div className={classes.searchBar}>
          {selectedFile && (
            <div className={classes.fileChip}>
              <span className={classes.fileName}>{selectedFile.name}</span>
              <RxCross2
                className={classes.cross}
                onClick={() => setSelectedFile(null)}
              />
            </div>
          )}

          <div className={classes.inputRow}>
            <FaPlus className={classes.upload} onClick={openFilePicker} />
            <textarea
              ref={textAreaRef}
              className={classes.userInput}
              placeholder={isListening ? "Listening..." :"Ask MiniAi"}
              onClick={() => setMenuCollapse(false)}
              value={prompt}
              onChange={handleInput}
              rows={1}
            />
            <input
              className={classes.fileHanlder}
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Microphone
              className={classes.mic}
              setPrompt={setPrompt}
              textAreaRef={textAreaRef}
              prompt={prompt}
              isListening={isListening}
              setIsListening={setIsListening}
            />
            {(prompt || selectedFile) && (
              <button className={classes.sendButton}>
                <HiArrowNarrowUp />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
