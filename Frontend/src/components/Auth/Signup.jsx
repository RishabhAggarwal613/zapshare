import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        if (!trimmedName || !trimmedEmail || !trimmedPassword) {
            setError('All fields are required.');
            return;
        }
        axios.post('http://localhost:3001/register', { name: trimmedName, email: trimmedEmail, password: trimmedPassword })
            .then(response => {
                
                console.log('Signup successful:', response.data);
                navigate('/login'); 
            })
            .catch(error => {
                const msg = error.response?.data?.message || 'Signup failed. Please try again.';
                setError(msg);
                console.error('Signup error:', error);
            });
    }
    if (showLogin) {
        return <Login />;
    }

return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a0033] via-[#3a1c71] to-[#ff0080]">
        <div className="bg-[#1a0033]/80 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-pink-500/30 backdrop-blur-md">
            <h2 className="text-3xl font-extrabold text-center text-pink-400 mb-6 drop-shadow-glow">🚀 Sign Up to ZapShare</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-purple-200 mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-pink-400/40 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-[#2d0a4b] text-white placeholder-purple-300 shadow-inner"
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        required
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-purple-200 mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-pink-400/40 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 bg-[#2d0a4b] text-white placeholder-purple-300 shadow-inner"
                        type="email"
                        id="email"
                        placeholder="you@email.com"
                        required
                        onChange={(e)=>setEmail(e.target.value)}
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
                        placeholder="********"
                        required
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-2 rounded font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-200 focus:ring-2 focus:ring-pink-400"
                >
                    Create Account
                </button>
            </form>
            {error && (
                <div className="mt-4 text-pink-300 text-center text-sm">{error}</div>
            )}
            <p className="text-center text-purple-200 mt-4 text-sm">
                Already have an account?{' '}
                <button
                    type="button"
                    className="text-pink-400 hover:underline"
                    onClick={() => navigate('/login')}
                >
                    Log in
                </button>
            </p>
        </div>
    </div>
)
}

export default Signup