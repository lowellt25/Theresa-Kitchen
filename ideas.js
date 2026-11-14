import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove }
  from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDjJRdnZmE5BPHZ5jhFzpfXvTeVjPzqXo4",
  authDomain: "theresa-kitchen.firebaseapp.com",
  projectId: "theresa-kitchen",
  storageBucket: "theresa-kitchen.firebasestorage.app",
  messagingSenderId: "944522075253",
  appId: "1:944522075253:web:a8e7bf55903878cf1fac3c"
});
const db = getFirestore(firebaseApp);

export async function setupIdeas(category) {
  const list = document.getElementById('ideasList');
  const ref = doc(db, 'ideas', category);

  function addToList(text) {
    const li = document.createElement('li');
    li.textContent = text + ' ';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'x';
    removeBtn.className='removeButton';
    removeBtn.addEventListener('click', async () => {
      await updateDoc(ref, { items: arrayRemove(text) });
      li.remove();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  try {
    let snap = await getDoc(ref);

    // First time only: fill Firestore from ideas.json
    if (!snap.exists()) {
      const response = await fetch('./ideas.json');
      const data = await response.json();
      await setDoc(ref, { items: data[category] });
      snap = await getDoc(ref);
    }

    snap.data().items.forEach(addToList);
  } catch (error) {
    console.error('Error loading ideas:', error);
  }

  document.getElementById('addButton').addEventListener('click', async () => {
    const input = document.getElementById('greatIdeaInput');
    const text = input.value.trim();
    if (!text) return;

    await updateDoc(ref, { items: arrayUnion(text) });

    addToList(text);
    closeIdeaForm();
  });
}


