"use client";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";
import React from "react";
interface TripFormData {
  name: string;
  description: string;
  dateRange: number;
  budget: number;
  itinerary: string;
  email: string;
}

const Suggestion = () => {
  const [formData, setFormData] = React.useState<TripFormData>({
    name: "",
    description: "",
    dateRange: 0,
    budget: 0,
    itinerary: "",
    email: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // You can submit the form data to your server or perform any desired actions here.
    console.log(formData);
  };

  return (
    <div className="h-screen w-screen bg-[url('/images/bg-8.jpg')] bg-cover bg-center bg-no-repeat">
      <NavbarLoggedIn />
      <div className="flex items-center justify-center h-[80vh]">
      <div className="py-4 px-6 rounded-xl shadow-md flex flex-col items-center justify-center bg-[#090909] bg-opacity-40 backdrop-blur-sm max-w-max">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Trip Suggestions</h2>
        <form className="flex flex-col max-w-max" onSubmit={handleSubmit}>
          <div className="mb-4 flex">
            <div className="mr-4 w-1/2">
              <label
                htmlFor="name"
                className="block text-white text-sm font-bold mb-2"
              >
                Destination:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                required
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="description"
                className="block text-white text-sm font-bold mb-2"
              >
                Description of Destination:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-white"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="mr-4 w-1/2">
              <label
                htmlFor="dateRange"
                className="block text-white text-sm font-bold mb-2"
              >
               Number of Days
              </label>
              <input
                type="number"
                id="dateRange"
                name="dateRange"
                value={formData.dateRange}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 bg-transparent text-white"
                required
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="budget"
                className="block text-white text-sm font-bold mb-2"
              >
                Budget per Head:
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 bg-transparent text-white"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="itinerary"
              className="block text-white text-sm font-bold mb-2"
            >
              Itinerary:
            </label>
            <textarea
              id="itinerary"
              name="itinerary"
              value={formData.itinerary}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 bg-transparent text-white"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Suggestion;
