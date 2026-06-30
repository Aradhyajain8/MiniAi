import { signOut } from "firebase/auth";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/sidebar";
import { useState } from "react";
import { auth } from "./firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { loadChats } from "./services/chatServices";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [menuCollapse, setMenuCollapse] = useState(false);
  const firstChat = {
    id: Date.now(),
    title: "",
    messages: [],
  };

  const [chats, setChats] = useState([firstChat]);

  const [currentChatId, setCurrentChatId] = useState(firstChat.id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      console.log(currUser);

      if (currUser) {
        try {
          const fireStoreChats = await loadChats(currUser.uid);
          if (fireStoreChats.length > 0) {
            setChats([firstChat,...fireStoreChats]);
            setCurrentChatId(firstChat.id);
          } else {
            setChats([firstChat]);
            setCurrentChatId(firstChat.id);
          }
        } catch (error) {
          setChats([firstChat]);
          setCurrentChatId(firstChat.id);
        }
      }
      // logout
      else {
        setChats([firstChat]);
        setCurrentChatId(firstChat.id);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function logoutHandler() {
    await signOut(auth);
  }
  return (
    <div className="app">
      <SideBar
        onLogout={logoutHandler}
        user={user}
        menuCollapse={menuCollapse}
        setMenuCollapse={setMenuCollapse}
        chats={chats}
        setChats={setChats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
      <Main
        user={user}
        loading={loading}
        menuCollapse={menuCollapse}
        setMenuCollapse={setMenuCollapse}
        chats={chats}
        setChats={setChats}
        currentChatId={currentChatId}
      />
    </div>
  );
}
