import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase-config/firebase";
import styles from "../styles/Home.module.css";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      M.toast({ html: `welcome ${result.user.displayName}`, classes: "green" });
    } catch (err) {
      M.toast({ html: err.message, classes: "red" });
    }
  };

  return (
    <div className="container center">
      <h3>Please Login to continue</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-field">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn ">
          Login
        </button>
        <Link href="/">
          <a>
            <h6 className={styles.link}>GO TO EXPLORE PAGE</h6>
          </a>
        </Link>

        <Link href="/signup">
          <a>
            <h6 className={styles.link}>Dont Have an account?</h6>
          </a>
        </Link>
      </form>
    </div>
  );
}
