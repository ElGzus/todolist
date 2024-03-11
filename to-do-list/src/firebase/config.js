import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAxsMOx0UjhVgbO5A5uY9wRIGAaqa-ghD0",
  authDomain: "todolist-3563e.firebaseapp.com",
  projectId: "todolist-3563e",
  storageBucket: "todolist-3563e.appspot.com",
  messagingSenderId: "623437143564",
  appId: "1:623437143564:web:f8c34925e85ca958899829"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);