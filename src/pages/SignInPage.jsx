import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorIcon from '../assets/docteur.png';
import patientIcon from '../assets/patient.png';
import appLogo from '../assets/followup.png'; // Replace with your app logo path

const SignInPage = () => {
  const [role, setRole] = useState('practitioner'); // Default role is 'practitioner'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    console.log('Selected Role:', role); // Debugging role selection
    console.log('Username:', username, 'Password:', password); // Debugging credentials

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      console.log('Server Response:', data); // Debugging server response

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('role', data.role);
        const userId = data.redirectUrl.split('/')[2];
        localStorage.setItem('userId', userId);
        navigate(data.redirectUrl);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: App Logo */}
      <div className="w-1/2 bg-gradient-to-r from-blue-200 to-green-200 flex flex-col justify-center items-center">
      <img src={appLogo} alt="App Logo" className="w-1/4 mb-10 rounded-lg" />
      <h1 className="text-3xl  text-black-600">Votre plateforme de suivi pour implants cochléaires
</h1>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-indigo-500 mb-4">JE SUIS UN</h2>
          <div className="flex justify-around mb-6">
            {/* Practitioner Role Selection */}
            <div
              className={`flex flex-col items-center cursor-pointer ${
                role === 'practitioner' ? 'border-2 border-indigo-500 rounded-lg' : ''
              }`}
              onClick={() => setRole('practitioner')} // Set role to 'practitioner'
            >
              <img src={doctorIcon} alt="Practitioner" className="w-20 h-20 mb-2" />
              <span className="text-gray-700">Medecin</span>
            </div>

            {/* Patient Role Selection */}
            <div
              className={`flex flex-col items-center cursor-pointer ${
                role === 'patient' ? 'border-2 border-indigo-500 rounded-lg' : ''
              }`}
              onClick={() => setRole('patient')} // Set role to 'patient'
            >
              <img src={patientIcon} alt="Patient" className="w-20 h-20 mb-2" />
              <span className="text-gray-700">Patient</span>
            </div>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Identifiant
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Saisir l'identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Sasir le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-indigo-500 hover:underline">
              Mot de passe oublié?
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignInPage;