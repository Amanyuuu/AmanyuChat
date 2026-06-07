import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let username = "";

window.joinChat = function() {
  username = document.getElementById("username").value;

  if (!username) return;

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
};

window.sendMessage = async function() {
  const text = document.getElementById("messageInput").value;

  if (!text) return;

  await addDoc(collection(db, "messages"), {
    username,
    text,
    time: Date.now()
  });

  document.getElementById("messageInput").value = "";
};

const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {
  const box = document.getElementById("messages");

  if (!box) return;

  box.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    box.innerHTML += `
      <p><b>${data.username}</b>: ${data.text}</p>
    `;
  });

  box.scrollTop = box.scrollHeight;
});
