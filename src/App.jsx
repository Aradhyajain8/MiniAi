import { signOut } from "firebase/auth";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/sidebar";
import { useState } from "react";
import { auth } from "./firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [menuCollapse, setMenuCollapse] = useState(false);

  useEffect(() => {
    const userCreated = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return userCreated;
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
      />
      <Main
        user={user}
        loading={loading}
        menuCollapse={menuCollapse}
        setMenuCollapse={setMenuCollapse}
      />
    </div>
  );
}
