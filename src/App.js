import SignInScreen from './SignInScreen';
import Header from './Header';
import Footer from './Footer';
import Game from './Game';

import './assets/style.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

// I think that the config and initializator must be outside of the App component.
const firebaseConfig = {
    apiKey: 'AIzaSyA3aGOBTftC2pngqZdKyyR8EAjJPv4KjGY',
    authDomain: 'wheresmoviecharacter.firebaseapp.com',
    projectId: 'wheresmoviecharacter',
    storageBucket: 'wheresmoviecharacter.appspot.com',
    messagingSenderId: '129467926650',
    appId: '1:129467926650:web:399f51fb330199dac913c3',
};
initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [name, setName] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    // When the component is mounted, find out if the user is authenticated
    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                setPhotoUrl(
                    user.photoURL || './assets/profile_placeholder.png'
                );
                setName(user.displayName);
                setIsSignedIn(true);

                console.log('Signed In');
            } else {
                setPhotoUrl('./assets/profile_placeholder.png');
                setName('');
                setIsSignedIn(false);

                console.log('Not logged in');
            }
        });
    });

    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider);
    };

    const signOutUser = () => {
        signOut(getAuth());
    };

    // Get the coordinates from the firestore and compare them
    // with the user's click's coordinates
    const gameFunc = async (e) => {
        // Get the document from the firestore
        // Attention: 'char1' should not be manually coded,
        //             but come from the option menu
        //             that appears on a user's click
        const docRef = doc(db, 'characters', 'char1');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log("There's no such document!");
            return;
        }

        // Get the stored coordinates
        const data = docSnap.data();
        const leftX = data['upper-left']['x'];
        const leftY = data['upper-left']['y'];
        const rightX = data['bottom-right']['x'];
        const rightY = data['bottom-right']['y'];

        // Get the user's click's coordinates
        const userX = e.clientX;
        const userY = e.clientY;

        console.log(leftX, leftY, rightX, rightY)
        console.log(userX, userY)

        // Compare
        if (
            (leftX <= userX && userX <= rightX) &&
            (leftY <= userY && userY <= rightY)
        ) {
            alert('You found it!');
        } else {
            alert('Not quite right!');
        }
    };

    return (
        <BrowserRouter>
            <Header
                user={getAuth().currentUser}
                signIn={signIn}
                signOut={signOutUser}
            />
            <Routes>
                <Route path="/" element={<SignInScreen />} />
                <Route path="/game" element={<Game gameFunc={gameFunc} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
