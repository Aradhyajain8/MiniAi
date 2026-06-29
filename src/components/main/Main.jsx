import { useRef, useState } from "react";
import Login from "../login/signup/login";
import classes from "./Main.module.css";
import Signup from "../login/signup/signup";
import Chat from "./chat";
import { askGemini } from "../../config/geminiApi";
import SearchBar from "./searchBar";

export default function Main({
  user,
  loading,
  menuCollapse,
  setMenuCollapse,
  setChats,
  chats,
  currentChatId,
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [verificationMsg, setVerificationMsg] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");

  const [isListening, setIsListening] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const textAreaRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

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

  async function handleSend() {
    if (!prompt.trim()) return;

    const userPrompt = prompt;
    setPrompt("");

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "2rem"; // or "auto"
    }

    console.log("user prompt ", userPrompt);

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== currentChatId) {
          return chat;
        }

        return {
          ...chat,
          title: chat.title || userPrompt.slice(0, 30),
          messages: [...chat.messages, { role: "user", text: userPrompt }],
        };
      }),
    );

    setIsLoading(true);

    try {
      const response = await askGemini(userPrompt);

      console.log("assistant response ", response);

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== currentChatId) {
            return chat;
          }

          return {
            ...chat,
            messages: [...chat.messages, { role: "assistant", text: response }],
          };
        }),
      );

      console.log("messages ", chats.messages);
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id !== currentChatId) {
            return chat;
          }

          return {
            ...chat,
            messages: [
              ...chat.messages,
              { role: "assistant", text: "Gemini free quota exhausted! Sorry" },
            ],
          };
        }),
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        <div className={classes.chatContainer}>
          {currentChat.messages.length === 0 ? (
            <div className={classes.greet}>
              <p>
                <span>Hello {user && user.displayName.split(" ")[0]}! </span>
              </p>
              <h1>How can i help you today?</h1>
            </div>
          ) : (
            <Chat messages={currentChat.messages} isLoading={isLoading} />
          )}
        </div>
      </div>
      <SearchBar
        prompt={prompt}
        setPrompt={setPrompt}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleSend={handleSend}
        isListening={isListening}
        setIsListening={setIsListening}
        textAreaRef={textAreaRef}
        setMenuCollapse={setMenuCollapse}
      />
    </div>
  );
}
