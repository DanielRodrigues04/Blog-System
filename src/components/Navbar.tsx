import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PenSquare, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            BlogSystem
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/create-post"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <PenSquare size={20} />
                  <span>New Post</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}