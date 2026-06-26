import classes from "./chat.module.css";
import ReactMarkdown from "react-markdown";

export default function Chat({ messages, isLoading }) {
  return (
    <div className={classes.chat}>
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            className={
              msg.role === "user" ? classes.userMessage : classes.aiMessage
            }
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        );
      })}

      {isLoading && (
        <div className={classes.assistant}>
          <p>Typing...</p>
        </div>
      )}
    </div>
  );
}
