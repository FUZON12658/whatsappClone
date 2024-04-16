import { initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD77bujmQMaZf6LkO6A71T3_qvUM7fuhz4",
  authDomain: "whatsapp-clone-bb11c.firebaseapp.com",
  projectId: "whatsapp-clone-bb11c",
  storageBucket: "whatsapp-clone-bb11c.appspot.com",
  messagingSenderId: "619362672453",
  appId: "1:619362672453:web:17039e86adcfb4352b682c",
  measurementId: "G-PZFYEE0D73"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app) 