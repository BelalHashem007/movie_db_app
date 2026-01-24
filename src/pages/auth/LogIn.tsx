import { useState } from "react";
import { signIn } from "../../supabase/auth";
import { isValidEmail } from "../../utility/helperFunctions";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import Input from "../../components/Input";
import Icon from "@mdi/react";
import { mdiAccountOutline } from "@mdi/js";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isSuccess = isValidEmail(email);
    if (!isSuccess) {
      toast.error("Please enter a valid email");
      return;
    }

    const { error } = await signIn(email, password);
    if (error) {
      toast.error("Invalid Credentials");
      return;
    }
    toast.success("Login is successful");
    navigate("/");
  }

  return (
    <section className="flex items-center justify-center h-full grow">
      <div className="bg-white px-6 py-7 w-full max-w-md my-15 border border-gray-200 shadow-xl rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="text-center mb-7">
          <h2 className="mb-0 font-bold">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Login to your MovieDB account
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <Input
              type="email"
              name="email"
              label="Email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col relative">
            <Input
              type="password"
              name="password"
              label="Password"
              value={password}
              placeholder=""
              onChange={(e) => setPassword(e.currentTarget.value)}
              showEye={true}
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="border-t dark:border-gray-700 border-gray-300 grow"></div>
          <div className="px-2">Or</div>
          <div className="border-t dark:border-gray-700 border-gray-300 grow"></div>
        </div>
        <button
          type="button"
          className={`flex items-center w-full justify-center gap-1 mt-5 border p-2 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50
            dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800  `}
        >
          <Icon
            path={mdiAccountOutline}
            size={1}
            className="relative -top-px"
          />
          <div>Login as a guest</div>
        </button>
        <div className="text-center mt-4 ">
          <span className="text-gray-500 dark:text-gray-400">
            Don't have an account?
          </span>{" "}
          <Link to={"/signup"} className="text-red-500">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
