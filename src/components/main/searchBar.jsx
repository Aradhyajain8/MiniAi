import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiArrowNarrowUp } from "react-icons/hi";
import Microphone from "./microphone";
import classes from "./searchBar.module.css";
import { useRef } from "react";

export default function SearchBar({
  selectedFile,
  setSelectedFile,
  textAreaRef,
  isListening,
  setIsListening,
  setMenuCollapse,
  prompt,
  setPrompt,
  handleSend,
}) {
  const fileInputRef = useRef(null);

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
          placeholder={isListening ? "Listening..." : "Ask MiniAi"}
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
          <button className={classes.sendButton} onClick={handleSend}>
            <HiArrowNarrowUp />
          </button>
        )}
      </div>
    </div>
  );
}
