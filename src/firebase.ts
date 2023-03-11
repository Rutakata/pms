import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBpzNM8XDBL-MsEtMyf8TZd0FJdglQrrL4",
    authDomain: "property-management-syst-91e65.firebaseapp.com",
    projectId: "property-management-syst-91e65",
    storageBucket: "property-management-syst-91e65.appspot.com",
    messagingSenderId: "276767848201",
    appId: "1:276767848201:web:54e18a3f429c6aedce05d8"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);