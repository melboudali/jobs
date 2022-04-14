import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, type Firestore, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const prodConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const devConfig = {
   apiKey: process.env.NEXT_PUBLIC_DEV_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_DEV_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_DEV_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_DEV_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_DEV_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_DEV_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_DEV_MEASUREMENT_ID,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export const app = initializeApp(config);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default getFirestore(app);

// export class Firebase {
//    app: FirebaseApp;
//    auth: Auth;
//    FireStore: Firestore;
//    constructor() {
//       this.app = initializeApp(config);
//       this.auth = getAuth(this.app);
//       this.FireStore = getFirestore(this.app);
//    }

//    async login(email: string, password: string) {
//       const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
//       const querySnapshot = await getDoc(doc(getFirestore(this.app), "users", userCredential.user.uid));
//       return { ...querySnapshot.data(), date: new Date().toISOString() };
//    }
// }
