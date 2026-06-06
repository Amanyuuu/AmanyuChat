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
  apiKey: "AIzaSyDPSv_Ndj2EjMim4_qrBluy-vOfH9NNbR4",
  authDomain: "amanyuchat.firebaseapp.com",
  projectId: "amanyuchat",
  storageBucket: "amanyuchat.firebasestorage.app",
  messagingSenderId: "88080670616",
  appId: "1:88080670616:web:1d922f36851d8e2a1595ed",
  measurementId: "G-10JKHNH2C9"
  
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