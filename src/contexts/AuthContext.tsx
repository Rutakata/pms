import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { User } from 'firebase/auth';


type Props = {
    children: JSX.Element
}

export type Context = {
    currentUser: User | null,
    signUp: ((email: string, password: string) => Promise<UserCredential>) | null,
    logIn: ((email: string, password: string) => Promise<UserCredential>) | null,
    logOut: (() => Promise<void>) | null,
}

const AuthContext = createContext<Context>({currentUser: null, signUp: null, logIn: null, logOut: null});


export function useAuth(): Context {
    return useContext<Context>(AuthContext);
}

const AuthProvider = ({children}: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value: Context = {
        currentUser,
        signUp,
        logIn,
        logOut,
    };

    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
}

export default AuthProvider;