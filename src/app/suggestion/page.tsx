"use client";
import React, { useState } from "react";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";
import Image from "next/image";

const Suggestion = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dateRange: 0,
    budget: 0,
    itinerary: "",
    email: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    dateRange: "",
    budget: "",
    itinerary: "",
    email: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const validateForm = (step: any) => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      dateRange: "",
      budget: "",
      itinerary: "",
      email: "",
    };

    switch (step) {
      case 1:
        if (formData.name.length < 2) {
          newErrors.name = "Name must be at least 2 characters long";
          isValid = false;
        }
        break;

      case 2:
        if (formData.description.length < 250) {
          newErrors.description =
            "Description should be at least 250 characters long";
          isValid = false;
        }
        break;

      case 3:
        if (formData.dateRange <= 0) {
          newErrors.dateRange = "Enter a valid trip duration";
          isValid = false;
        }
        if (formData.budget < 100) {
          newErrors.budget = "Budget should be more than $99";
          isValid = false;
        }
        break;

      case 4:
        if (formData.itinerary.length < 550) {
          newErrors.itinerary =
            "Itinerary should be at least 550 characters long";
          isValid = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Simulate a submission for demonstration purposes
    // In your real application, submit the form data to your server here.
    setCurrentStep((prevStep) => prevStep + 1)
    setTimeout(() => {
      setSubmissionStatus("approved"); // Set submission status to "approved" after a delay
    }, 2000);
  };

  const handleInputKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleNextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-center text-3xl font-bold mb-6 text-white">
              Step 1: Destination
            </h2>
            <input
              type="text"
              placeholder="E.g., Dreamland or Unicorn Paradise 🦄"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={`w-full h-12 border bg-[#2f3542] text-white ${
                errors.name ? "border-red-500" : "border-gray-300"
              } px-3 rounded-md hover:border-blue-500 transition duration-300 focus:outline-none mb-4`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-2">{errors.name}</p>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition focus:outline-none ease-in-out duration-500 animate-pulse"
            >
              Next
            </button>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-center text-3xl font-bold mb-6 text-white">
              Step 2: Description
            </h2>
            <textarea
              placeholder="Describe your dream destination in a fun and imaginative way! 🚀"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={`w-full h-32 border bg-[#2f3542] text-white ${
                errors.description ? "border-red-500" : "border-gray-300"
              } px-3 rounded-md hover:border-blue-500 transition duration-300 focus:outline-none mb-4`}
              rows={4}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mb-2">{errors.description}</p>
            )}
            <div className="flex justify-between gap-16">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-1/2 h-12 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition duration-300 focus:outline-none"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-1/2 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition focus:outline-none ease-in-out duration-500 animate-pulse"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-center text-3xl font-bold mb-6 text-white">
              Step 3: Number of Days and Budget
            </h2>
            <input
              type="number"
              placeholder="How many days are you planning to spend?"
              name="dateRange"
              value={formData.dateRange}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={`w-full h-12 border ${
                errors.dateRange ? "border-red-500" : "border-gray-300"
              } px-3 rounded-md hover:border-blue-500 transition duration-300 focus:outline-none mb-4`}
              required
            />
            {errors.dateRange && (
              <p className="text-red-500 text-sm mb-2">{errors.dateRange}</p>
            )}
            <input
              type="number"
              placeholder="What's your budget per person?"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={`w-full h-12 border bg-[#2f3542] text-white ${
                errors.budget ? "border-red-500" : "border-gray-300"
              } px-3 rounded-md hover:border-blue-500 transition duration-300 focus:outline-none mb-4`}
              required
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mb-2">{errors.budget}</p>
            )}
            <div className="flex justify-between gap-16">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-1/2 h-12 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition duration-300 focus:outline-none"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-1/2 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition focus:outline-none ease-in-out duration-500 animate-pulse"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-center text-3xl font-bold mb-6 text-white">
              Step 4: Itinerary
            </h2>
            <textarea
              placeholder="Share your dream itinerary with us! 🌟"
              name="itinerary"
              value={formData.itinerary}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={`w-full h-32 border bg-[#2f3542] text-white ${
                errors.itinerary ? "border-red-500" : "border-gray-300"
              } px-3 rounded-md hover:border-blue-500 transition duration-300 focus:outline-none mb-4`}
              rows={4}
              required
            />
            {errors.itinerary && (
              <p className="text-red-500 text-sm mb-2">{errors.itinerary}</p>
            )}
            <div className="flex justify-between gap-16">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-1/2 h-12 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition duration-300 focus:outline-none"
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-1/2 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:shadow-md transition focus:outline-none ease-in-out duration-500 animate-pulse"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        );

      case 5:
        if (submissionStatus === "approved") {
          return (
            <div className="text-center text-green-500 mt-4">
              <Image src="/videoBg/completion.gif" alt="completed form" width={540} height={360}/>
              <p>Your destination has been submitted for approval.</p>
            </div>
          );
        }
        break;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 inset-0 w-full h-full object-cover"
      >
        <source src="/videoBg/bg-1.webm" type="video/webm" />
      </video>
      <div className="z-10 relative">
        <NavbarLoggedIn />
      </div>
      <div className="flex items-center justify-center h-[70vh]">
        <div className="relative">
          <div className="bg-opacity-80 backdrop-blur-lg p-4 sm:p-8 rounded-md shadow-lg max-w-md lg:w-[800px] mx-auto relative z-10 transform transition duration-500 ease-in-out">
            <form onSubmit={handleSubmit}>{renderStep()}</form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
