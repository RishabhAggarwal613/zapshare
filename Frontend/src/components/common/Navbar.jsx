import React from 'react'

const Upload = () => <span role="img" aria-label="upload">⬆️</span>;
const LogOut = ({ className }) => <span role="img" aria-label="logout" className={className}>🚪</span>;
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

const Navbar = ({ user, onLogout }) => (
    <header className="border-b border-pink-500/30 bg-gradient-to-br from-[#1a0033] via-[#3a1c71] to-[#ff0080] backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">ZapShare</h1>
                        <p className="text-xs text-purple-200">Secure file transfer</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-pink-200">{user?.username || user?.name}</p>
                        <p className="text-xs text-purple-200">{user?.email}</p>
                    </div>
                    <Button
                        onClick={onLogout}
                        size="sm"
                        variant="outline"
                        className="ml-4 px-3 py-1 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow hover:from-pink-600 hover:to-blue-600 transition-all duration-200"
                    >
                        <LogOut className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </div>
    </header>
);

export default Navbar;
