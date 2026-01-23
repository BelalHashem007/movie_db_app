import { useState } from "react";
import { signIn } from "../../supabase/auth";
import { isValidEmail } from "../../utility/helperFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function Login() {
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const navigate = useNavigate();

    async function handleLogin(){
        const isSuccess = isValidEmail(email)
        if (!isSuccess){
            toast.error("Please enter a valid email")
            return;
        }
            
        const {error} = await signIn(email,password)
        if (error){
            toast.error("Invalid Credentials")
            return;
        }
        navigate("/")
    }

  return (
    <section>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
        <button type="button" onClick={handleLogin}>Log in</button>
      </form>
        <button type="button">Login as a guest</button>
    </section>
  );
}
