import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import Board from "./board";
import Login from "../authentication/login.js";

function ProtectedBoard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user ? <Board user={user} /> : <Login />;
}

export default ProtectedBoard;
