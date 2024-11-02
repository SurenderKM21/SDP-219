import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Particles from "@/components/magicui/particles"; // Import Particles component
import carset2 from "../../assets/img/carset2.jpeg"; // Adjust this path according to your project structure
import axios from "axios"; // Import Axios

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // State to control image visibility

  const {
    date,
    carModel,
    question1,
    question3,
    question4,
    laborCharge,
    toolCharge,
    totalAmount,
  } = location.state || {};

  const handleConfirmBooking = async () => {
    // Create the Services object to send to the backend
    const serviceData = {
      title: "New Booking", // Set a default title or use a dynamic one
      completed: 0, // Assuming new bookings are not completed
      pending: 1, // Set as pending
      description: question4, // Using additional notes as description
      carModel,
      date,
      question1,
      question3,
      question4,
      laborCharge,
      toolCharge,
      totalAmount,
    };
  
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
  
      // Send POST request to create a new service with authorization header
      await axios.post("http://localhost:8083/services", serviceData, {
        headers: {
          Authorization: `Bearer ${token}`, // Token for authorization
        },
      });
      
  
      alert("Booking confirmed!");
      navigate("/");
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking. Please try again.");
    }
  };
  
  
  
  // const handleConfirmBooking = async () => {
  //   // Create the Services object to send to the backend
  //   const serviceData = {
  //     title: "New Booking", // Set a default title or use a dynamic one
  //     completed: 0, // Assuming new bookings are not completed
  //     pending: 1, // Set as pending
  //     description: question4, // Using additional notes as description
  //     carModel,
  //     date,
  //     question1,
  //     question3,
  //     question4,
  //     laborCharge,
  //     toolCharge,
  //     totalAmount,
  //   };

  //   try {
  //     // Send POST request to create a new service
  //     await axios.post("http://localhost:8083/services", serviceData);
  //     alert("Booking confirmed!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error confirming booking:", error);
  //     alert("Failed to confirm booking. Please try again.");
  //   }
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Make the image visible after a delay
    }, 200); // Delay to create the animation effect

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex">
      {/* Background particles only for the content, not affecting the navbar */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Booking details content */}
      <div className="relative z-10 w-1/2 p-8">
        <h1 className="text-4xl mb-12 text-black dark:text-white">Booking Details</h1>
        <div className="space-y-4 text-left">
          <div className="flex justify-between">
            <strong>Date:</strong>
            <span>{new Date(date).toDateString()}</span>
          </div>
          <div className="flex justify-between">
            <strong>Car Model:</strong>
            <span>{carModel}</span>
          </div>
          <div className="flex justify-between">
            <strong>Issue Type:</strong>
            <span>{question1}</span>
          </div>
          <div className="flex justify-between">
            <strong>Preferred Time:</strong>
            <span>{question3}</span>
          </div>
          <div className="flex justify-between">
            <strong>Additional Notes:</strong>
            <span>{question4}</span>
          </div>
          <div className="flex justify-between">
            <strong>Labor Charge:</strong>
            <span>${laborCharge}</span>
          </div>
          <div className="flex justify-between">
            <strong>Tool Charge:</strong>
            <span>${toolCharge}</span>
          </div>
          <div className="flex justify-between">
            <strong>Total Amount:</strong>
            <span>${totalAmount}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleConfirmBooking}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 mt-6"
        >
          Confirm Booking
        </button>
      </div>

      {/* Hero Image */}
      <div
        className={`w-1/2 h-screen bg-cover bg-center transition-transform duration-700 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${carset2})`,
          objectFit: "cover", // Adjusts the fit of the image
        }}
      />
    </div>
  );
};

export default BookingDetails;
