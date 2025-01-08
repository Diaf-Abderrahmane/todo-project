import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [role, setRole] = useState('patient'); // Default role is 'patient'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    // Send a POST request to the backend
    const response = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    console.log(data);
    
  
    if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        
        const userId = data.redirectUrl.split('/')[2]; // Get the ID from the URL
         // Convert "patients" to "patient" and "practitioners" to "practitioner"

          // Store userId in localStorage
         localStorage.setItem('role', data.role); // Get the ID from the URL
         console.log(data.role);
         
         localStorage.setItem('userId', userId); // Get the ID from the URL
        console.log(role);
        
      // Redirect to the URL provided by the backend
      navigate(data.redirectUrl);
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-500 mb-4">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700 mb-2">I am a</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="practitioner">Practitioner</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
