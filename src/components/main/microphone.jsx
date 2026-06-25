import { useEffect, useRef, useState } from "react";
import { IoMicOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function Microphone(props) {
  const recognition = useRef(null);
  const previousPrompt = useRef("");

  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!speechRecognition) {
      alert("speech recognition is not supported in this browser");
      return;
    }

    recognition.current = new speechRecognition();

    recognition.current.continuous = true;
    recognition.current.interimResults = false; //it writes while u r speaking but it is duplicating
    recognition.current.lang = "en-US";

    // browser runs this func whenever speech is recognized
    recognition.current.onresult = (event) => {
      let transcript = "";

      // results is an array which stores all speech recognistion result
      for (let i = event.resultIndex; i < event.results.length; i++) {
        console.log(event.results[i].isFinal);
        transcript += event.results[i][0].transcript;
      }

      console.log("Transcript:", transcript);

      props.setPrompt((prev) => prev + transcript);
      const textArea = props.textAreaRef.current;

      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    recognition.current.onend = () => {
      props.setIsListening(false);
    };
  }, []);

  function startListening() {
    previousPrompt.current = props.prompt;

    recognition.current.start();
    props.setIsListening(true);
  }

  function stopListening() {
    recognition.current.stop();
  }

  function cancelListening() {
    recognition.current.stop();

    props.setPrompt(previousPrompt.current);
    const textArea = props.textAreaRef.current;

    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  return (
    <>
      {props.isListening ? (
        <>
          <FaCheck className={props.className} onClick={stopListening} />
          <RxCross2 className={props.className} onClick={cancelListening} />
        </>
      ) : (
        <IoMicOutline className={props.className} onClick={startListening} />
      )}
    </>
  );
}
