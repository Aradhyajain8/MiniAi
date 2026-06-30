import classes from "./sidebar.module.css";
import { IoMenu } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { IoIosTimer } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import SidebarBottomItems from "./sidebar_bottom_items";
import { MdLogout } from "react-icons/md";

export default function SideBar({
  onLogout,
  user,
  menuCollapse,
  setMenuCollapse,
  chats,
  setChats,
  setCurrentChatId,
  currentChatId,
}) {
  function handleMenu() {
    setMenuCollapse((prev) => !prev);
  }

  function handleNewChat() {
    console.log("clicked");

    const newChat = {
      id: Date.now(),
      title: "",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  }

  return (
    <div className={`${classes.sidebar} ${menuCollapse ? classes.open : ""}`}>
      <div className={classes.top}>
        <IoMenu
          className={`${classes.icon} ${classes.menu}`}
          onClick={handleMenu}
        />
        <div className={classes.newChat} onClick={handleNewChat}>
          <FaPlus className={`${classes.icon} ${classes.plus}`} />
          {menuCollapse && <p>New Chat</p>}
        </div>

        {menuCollapse && (
          <div className={classes.recent}>
            <p className={classes.recentTitle}>Recent</p>
            {chats
              .filter((chat) => chat.title !== "")
              .map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={`${classes.recentEntry} ${
                    menuCollapse ? classes.recentEntryOpen : ""
                  } ${currentChatId === chat.id ? classes.activeChat : ""}`}
                >
                  <FaRegMessage
                    className={`${classes.icon} ${classes.recentIcon}`}
                  />
                  <p>{chat.title || "New chat"}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={classes.bottom}>
        {user && (
          <SidebarBottomItems
            className={`${classes.bottomItems} ${classes.recentEntry}`}
            icon={<MdLogout className={classes.icon} />}
            onClick={onLogout}
            text="LogOut"
            menuCollapse={menuCollapse}
          />
        )}

        <SidebarBottomItems
          className={`${classes.bottomItems} ${classes.recentEntry} ${classes.help}`}
          icon={<HiQuestionMarkCircle className={classes.icon} />}
          text="Help"
          menuCollapse={menuCollapse}
        />

        <SidebarBottomItems
          className={`${classes.bottomItems} ${classes.recentEntry}`}
          icon={<IoIosTimer className={classes.icon} />}
          text="Activity"
          menuCollapse={menuCollapse}
        />

        <SidebarBottomItems
          className={`${classes.bottomItems} ${classes.recentEntry}`}
          icon={<FiSettings className={classes.icon} />}
          text="Settings"
          menuCollapse={menuCollapse}
        />
      </div>
    </div>
  );
}
