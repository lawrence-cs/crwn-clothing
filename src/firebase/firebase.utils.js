import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDIckgYitXuANgKxp_5VlCKw8E2j_I_v4M",
    authDomain: "crwn-db-68b28.firebaseapp.com",
    databaseURL: "https://crwn-db-68b28.firebaseio.com",
    projectId: "crwn-db-68b28",
    storageBucket: "crwn-db-68b28.appspot.com",
    messagingSenderId: "959033416917",
    appId: "1:959033416917:web:a7d00cea388b7048d6d65c",
    measurementId: "G-3N7Y5TW07C"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //[C]RUD Create data when user doesn't exist
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

// START OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}
// END OF EXPERIMENTAL CODE 002: USE THIS CODE TO CREATE DATA TO FIREBASE WITHOUT TYPING THE WHOLE THING

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

//This triggers the google pop-up whenever we use GoogleAuthProvider() for authentication and signin
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;