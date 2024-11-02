import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useSelector } from "react-redux";

const UserUsers = () => {
  
  const user = useSelector((state) => state.auth.user);
  const email = user?.email; // Get user email from the user object

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8083/users/get/${email}`, {
  //         headers: {
  //           "Authorization":`Bearer ${localStorage.getItem('token')}`, 
  //         },
  //       });
  //       if (!response.ok) {
  //         console.log("NOT OK");
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
    

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        console.error("User email is not defined.");
        return; // Exit early if email is not available
      }
      try {
        const token = localStorage.getItem('token');
        console.log("Authorization Token:", token); // Log the token
        const response = await fetch(`http://localhost:8083/users/get/${email}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        console.log('LOG',response);
        if (!response.ok) {
          console.log("Response not OK:", response.statusText);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchData();
  }, [email]); // Include email as a dependency
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <Avatar>
            <AvatarImage src={userData.profilePicture} alt={userData.username} />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </div>

        {isEditing ? (
          <div className="w-full max-w-lg">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700 text-left"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                value={userData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-lg"
              />
            </div>
            {/* Add similar input fields for email, phone, location */}
            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center px-6 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-6 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <div className="mb-6">
              <div className="text-lg font-bold text-gray-900">
                {userData.username}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">Email: </span>
                {userData.email}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">Phone: </span>
                {userData.phone}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">Location: </span>
                {userData.location}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-6 py-2 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUsers;
