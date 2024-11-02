import  { useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ModeToggle } from "../mode-toggle"; // Importing your mode toggle component
import { AiFillCar } from "react-icons/ai"; // Car icon
import { FaUserCircle } from "react-icons/fa"; // User icon
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/authSlice"; // Redux logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get user info directly from Redux
  const user = useSelector((state) => state.auth.user);

  const userEmail = user?.email; // Get user email from the user object

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to Redux
    navigate("/"); // Navigate to home after logout
    setShowDropdown(false); // Close dropdown on logout
  };

  // Handle profile click
  const handleProfileClick = () => {
    setShowDropdown(false); // Close dropdown
    navigate("/user/users"); // Navigate to user profile
  };

  return (
    <div className="w-full h-[8vh] flex flex-row justify-center items-center shadow-sm shadow-primary/50 relative">
      <div className="w-1/4 h-full text-primary font-bold flex justify-start items-center text-lg">
        <AiFillCar className="text-4xl mr-4" />
        <span className="font-bold text-2xl">Moto-genZ</span>
      </div>

      <div className="w-2/4 h-full font-bold flex flex-row justify-end items-center gap-8">
        {/* Navigation Links */}
        <Link
          to="/"
          className={`text-gray-700 hover:text-primary ${
            location.pathname === "/" ? "text-primary font-bold" : ""
          }`}
        >
          Home
        </Link>

        <Link
          to="/services/list"
          className={`text-gray-700 hover:text-primary ${
            location.pathname === "/services/list" ? "text-primary font-bold" : ""
          }`}
        >
          Services
        </Link>

        <Link
          to="/tutorials"
          className={`text-gray-700 hover:text-primary ${
            location.pathname === "/tutorials" ? "text-primary font-bold" : ""
          }`}
        >
          Tutorials
        </Link>

        {userEmail ? ( // Check if userEmail exists
          <div className="relative">
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
            />
            <span
              className="cursor-pointer ml-2"
              onClick={() => setShowDropdown(!showDropdown)} // Show email next to icon
            >
              {userEmail}
            </span>

            {showDropdown && ( // Render dropdown if visible
              <div className="absolute right-0 bg-white border border-gray-300 p-2 mt-2 shadow-md rounded z-50">
                <div
                  className="block mt-2 hover:underline cursor-pointer"
                  onClick={handleProfileClick}
                >
                  Profile
                </div>
                <div
                  className="block mt-2 text-red-600 hover:underline cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : ( // Show Login and Register links if not logged in
          <>
            <Link
              to="/login"
              className={`list-none text-gray-700 hover:text-primary ${
                location.pathname === "/login" ? "text-primary font-bold" : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`list-none text-gray-700 hover:text-primary ${
                location.pathname === "/register" ? "text-primary font-bold" : ""
              }`}
            >
              Register
            </Link>
          </>
        )}

        <ModeToggle /> {/* Toggle for light/dark mode */}
      </div>
    </div>
  );
};

export default Navbar;
