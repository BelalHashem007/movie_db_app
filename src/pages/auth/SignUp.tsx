import { useState } from "react";
import { createAccount } from "../../supabase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (password.length > 6 && password === confirmPassword) {
       const {error} = await createAccount(email, password);
       if (error){
        toast.error(error?.message);
        return;
       }
       toast.success("Your account creation is successful!")
       navigate("/")
    }
  }
  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <p>
        Password Length must be higher than 6:
        {password.length > 6 ? "✓" : "✗"}{" "}
      </p>
      <p>
        Password and confirmPassword must match :
        {password === confirmPassword ? "✓" : "✗"}{" "}
      </p>
    </>
  );
}
