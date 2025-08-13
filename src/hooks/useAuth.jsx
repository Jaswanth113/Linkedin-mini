import { useState, useEffect, createContext, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { jsx as _jsx } from "react/jsx-runtime";
const AuthContext = /*#__PURE__*/createContext(undefined);
export function AuthProvider({
  children
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userProfile = {
              id: firebaseUser.uid,
              ...userDoc.data()
            };
            setCurrentUser(userProfile);
          } else {
            // Create a new profile if it doesn't exist
            const newUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'New User',
              profilePicture: firebaseUser.photoURL || `https://avatar.vercel.sh/${firebaseUser.uid}`
            };
            await setDoc(userDocRef, newUser);
            setCurrentUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // In case of error, we still have a firebase user, but no profile.
          // We can set a minimal user object or handle it as needed.
          setCurrentUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Error User'
          });
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Ensure user profile exists
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        // Create profile if missing
        const userData = {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || 'User',
          profilePicture: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=150&h=150&fit=crop&crop=face`,
          bio: '',
          skills: [],
          certificates: [],
          projects: [],
          workExperience: [],
          education: [],
          achievements: [],
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, userData);
      }
      const userData = userDoc.exists() ? userDoc.data() : {};
      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: userData?.displayName || userCredential.user.displayName || 'User',
        profilePicture: userData?.profilePicture || userCredential.user.photoURL || ''
      };
      setCurrentUser(user);
      setLoading(false);

      // The user will also be set in the useEffect via onAuthStateChanged
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      throw error;
    }
  };
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(user, {
        displayName
      });

      // Create user document in Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName,
        profilePicture: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=150&h=150&fit=crop&crop=face`,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), userData);

      // The user will be set in the useEffect via onAuthStateChanged
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };
  const logout = () => {
    signOut(auth);
    // The user will be cleared in the useEffect via onAuthStateChanged
  };
  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };
  return /*#__PURE__*/_jsx(AuthContext.Provider, {
    value: value,
    children: children
  });
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}