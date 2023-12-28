import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignInForm() {
  const supabase = useSupabaseClient();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      setUserData({ email: "", password: "" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col w-auto gap-2 p-4">
      <input
        className="outline-none border bg-inherit px-2 py-1 text-slate-300 placeholder:text-sm"
        type="text"
        name="email"
        value={userData.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <input
        className="outline-none border bg-inherit px-2 py-1 text-slate-300 placeholder:text-sm"
        type="password"
        name="password"
        value={userData.password}
        placeholder="Choose password"
        onChange={handleChange}
      />
      <button
        className="bg-slate-200 rounded-xl py-1 px-2 mt-2 text-primary hover:bg-inherit hover:text-slate-300 hover: border hover:border-slate-200"
        onClick={handleSubmit}
      >
        Sign In
      </button>
    </div>
  );
}
