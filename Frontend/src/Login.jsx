import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
        setError("Both fields are required.");
        setLoading(false);
        return;
    }

    try {
        const res = await axios.post("http://localhost:3001/login", { email, password });
        setSuccess(true);
        navigate("/home", { state: { user: res.data.user } });
    } catch (err) {
        setError(
            err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0033] via-[#3a1c71] to-[#ff0080]">
            <div className="bg-[#1a0033]/80 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-pink-500/30 backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center text-pink-400 mb-6 drop-shadow-glow">🚀 ZapShare Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-purple-200 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-pink-400/40 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-[#2d0a4b] text-white placeholder-purple-300 shadow-inner"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-purple-200 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-pink-400/40 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-[#2d0a4b] text-white placeholder-purple-300 shadow-inner"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-2 rounded font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-200 focus:ring-2 focus:ring-pink-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {error && (
                    <div className="mt-4 text-pink-300 text-center text-sm">{error}</div>
                )}
                {success && (
                    <div className="mt-4 text-green-400 text-center text-sm">
                        Login successful!
                    </div>
                )}
                <p className="mt-4 text-center text-purple-200 text-sm">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="text-pink-400 hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;