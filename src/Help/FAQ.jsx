import Help from "./help";
import classes from "./Faq.module.css";

const faqs = [
  {
    question: "Are my chats saved?",
    answer:
      "Yes. Once you're logged in, your chats are automatically saved to your account",
  },
  {
    question: "Can I access my chats on another device?",
    answer:
      "Yes. Simply log in with the same account, and your saved chats will be available.",
  },
  {
    question: "Do I need to log in to use MiniAI?",
    answer:
      "You can explore the interface without logging in, but signing in is required to save and sync your chat history.",
  },
  {
    question: "Is my chat data private?",
    answer:
      "Yes. Your chats are linked to your account, and users cannot access each other's conversations.",
  },
];

export default function Faq({ menuCollapse, BackToMenu }) {
  return (
    <div className={`${classes.faq} ${menuCollapse ? classes.hideFaq : ""}`}>
      <h1>FAQ's</h1>
      {faqs.map((faq, idx) => {
        return (
          <Help ques={faq.question} ans={faq.answer} key={idx} index={idx} />
        );
      })}

      <button className={classes.backBtn} onClick={BackToMenu}>
        Back to main
      </button>
    </div>
  );
}
