import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDDS2O1pdxdqc_86cKYfn3H7pIL6tB5BE",
  authDomain: "crwn-db-9fc2e.firebaseapp.com",
  projectId: "crwn-db-9fc2e",
  storageBucket: "crwn-db-9fc2e.appspot.com",
  messagingSenderId: "610266891023",
  appId: "1:610266891023:web:1fb895701890f1afc9b47a"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshort = await getDoc(userDocRef);
    console.log(userSnapshort);
    console.log(userSnapshort.exists());

    if (!userSnapshort.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}