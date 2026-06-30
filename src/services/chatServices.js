import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveChat(uid, chat) {
  await setDoc(doc(db, "users", uid, "chats", chat.id.toString()), chat);
}

export async function loadChats(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "chats"));

  return snapshot.docs.map((doc) => ({
    id: Number(doc.id),
    ...doc.data(),
  }));
}
