import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve role and userId from localStorage
    const storedRole = localStorage.getItem('role'); // You could also store the role in localStorage
    const storedUserId = localStorage.getItem('userId');
    
    // If the user is logged in, set the role and userId
    if (storedRole && storedUserId) {
      setRole(storedRole);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    // Clear the JWT token and role from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    
    // Redirect the user to the login page
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Follow up
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                {role === 'patient' && (
                  <>
                    <NavLink to={`/patients/${userId}`} className={linkClass}>
                      My Profile
                    </NavLink>
                    <NavLink to="/add-adverseevent" className={linkClass}>
                      Add Adverse Event
                    </NavLink>
                    <NavLink to="/appointments" className={linkClass}>
                      Appointments
                    </NavLink>
                    <NavLink to="/my-adverseevents" className={linkClass}>
                      My Adverse Events
                    </NavLink>
                  </>
                )}
                {role === 'practitioner' && (
                  <>
                  <NavLink to={`/patients`} className={linkClass}>
                    Patients
                  </NavLink>
                  <NavLink to={`/adverseevents`} className={linkClass}>
                    Adverse Events
                  </NavLink>
                  </>
                )}
                <button
                    onClick={handleLogout}
                    className='bg-red-600 text-white rounded-md px-3 py-2 hover:bg-red-700'
                  >
                    Log Out
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
