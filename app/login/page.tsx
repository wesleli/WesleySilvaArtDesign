"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }
  
    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
  type="text"
  placeholder="Usuário"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<input
  type="password"
  placeholder="Senha"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<button
  type="submit"
  className={`bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition ${
    !username || !password ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={!username || !password}
>
  Entrar
</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;