import { useState } from "react";
import { createAccount } from "../../supabase/auth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { isValidEmail } from "../../utility/helperFunctions";
import Input from "../../components/Input";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const inputStyle =
    "border py-2 px-4 rounded-[10px] border-gray-400 focus:outline w-full dark:border-gray-700 dark:bg-gray-800";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = isValidEmail(email);
    if (!isValid) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length > 6 && password === confirmPassword) {
      const { error } = await createAccount(email, password);
      if (error) {
        toast.error(error?.message);
        return;
      }
      toast.success("Your account creation is successful!");
      navigate("/");
    }
  }

  return (
    <section className="flex items-center justify-center h-full grow">
      <div className="bg-white px-6 py-7 w-full max-w-md my-15 border border-gray-200 shadow-xl rounded-lg dark:bg-gray-900 dark:border-gray-800">
        <div className="text-center mb-7">
          <h2 className="mb-0 font-bold">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Join MovieDB to get started
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              placeholder="Enter your email"
              inputClassName={inputStyle}
            />
          </div>
          <div className="flex flex-col relative">
            <Input
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              placeholder="Enter your password"
              inputClassName={inputStyle}
              showEye={true}
            />
            <p className="text-[0.875rem] text-gray-500 dark:text-gray-400 mt-1">
              Password Length must be higher than 6:
              {password.length > 6 ? (
                <span className="text-green-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </p>
          </div>

          <div className="flex flex-col relative">
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
              }}
              placeholder="Confirm your password"
              inputClassName={inputStyle}
              showEye={true}
            />
            <p className="text-[0.875rem] text-gray-500 dark:text-gray-400 mt-1">
              Password and confirmPassword must match :
              {password === confirmPassword ? (
                <span className="text-green-500">✓</span>
              ) : (
                <span className="text-red-500">✗</span>
              )}
            </p>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded-lg font-bold"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4 ">
          <span className="text-gray-500 dark:text-gray-400">
            Already have an account?
          </span>{" "}
          <Link to={"/login"} className="text-red-500">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
