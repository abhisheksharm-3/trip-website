"use client";
import React, { useState, useEffect } from "react";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Place {
  _id: string;
  name: string;
  description: string;
  email: string;
  votesInFavour: number;
  votesAgainst: number;
  itinerary: string;
}

interface Votes {
  [key: string]: {
    inFavor: number;
    against: number;
  };
}

const ITEMS_PER_PAGE = 5;

const Vote = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [votes, setVotes] = useState<Votes>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ places: Place[] }>(
          "/api/users/vote"
        );
        const placesData = response.data.places;
        const initialVotes: Votes = {};
        placesData.forEach((place) => {
          initialVotes[place._id] = {
            inFavor: place.votesInFavour,
            against: place.votesAgainst,
          };
        });
        setVotes(initialVotes);
        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchData();
  }, []);

  const handleVote = (placeId: string, type: "inFavor" | "against") => {
    if (places.some((place) => place._id === placeId)) {
      const newVotes: Votes = { ...votes };
      if (type === "inFavor") {
        newVotes[placeId].inFavor += 1;
      } else if (type === "against") {
        newVotes[placeId].against += 1;
      }
      setVotes(newVotes);

      axios
        .post("/api/users/voteChange", { placeId, type })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Vote submitted!");
          } else {
            console.error("Vote submission error:", response.data);
            toast.error("Vote submission error");
          }
        })
        .catch((error) => {
          console.error("An error occurred while processing the vote:", error);
          toast.error("An error occurred while processing the vote");
        });
    }
  };

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleToggleDetails = (place: Place) => {
    setSelectedPlace(place);
    setIsPopupOpen(true); // Open the custom popup
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  

  const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE);
  const itemsToShow = places.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('/images/bg-5.jpg')] bg-center bg-cover bg-no-repeat">
    <div className="z-10 relative">
      <NavbarLoggedIn />
    </div>
    <div className="flex items-center justify-center h-[70vh]">
      <div className="relative">
        <div className="neuro bg-opacity-80 backdrop-blur-lg p-4 sm:p-8 rounded-md shadow-lg max-w-md lg:w-[800px] mx-auto relative z-0 transform transition duration-500 ease-in-out" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h2 className="text-center text-3xl font-bold mb-6 text-white">
            Vote for Places
          </h2>
          {places.length === 0 ? (
            <p className="text-white text-center">No places approved by admin yet.</p>
          ) : (
            <ul>
              {itemsToShow.map((place) => (
                <li key={place._id} className="mb-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {truncateText(place.name, 50)}
                    </h3>
                    <p className="mb-2">Email: {place.email}</p>
                    <p className="mb-2">In Favor: {votes[place._id].inFavor}</p>
                    <p className="mb-2">Against: {votes[place._id].against}</p>
                  </div>
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
                      onClick={() => handleVote(place._id, "inFavor")}
                    >
                      Vote in Favor
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                      onClick={() => handleVote(place._id, "against")}
                    >
                      Vote Against
                    </button>
                    <button
                      onClick={() => handleToggleDetails(place)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-2"
                    >
                      Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    {isPopupOpen && selectedPlace && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-[350px] relative flex items-center flex-col justify-center">
      <button
        className="absolute top-2 right-2 text-gray-300 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl focus:outline-none"
        onClick={handleClosePopup}
      >
        &times;
      </button>
      <h2 className="text-2xl font-extrabold pt-8 text-center text-white">
        Place Details
      </h2>
      <div className="w-72 h-52 overflow-y-auto text-center text-neutral-500 dark:text-neutral-400 text-sm font-normal pt-4">
        <p className="text-xl font-bold mb-2">{selectedPlace.name}</p>
        <p className="mb-2">Email: {selectedPlace.email}</p>
        <p className="mb-2">In Favor: {votes[selectedPlace._id].inFavor}</p>
        <p className="mb-2">Against: {votes[selectedPlace._id].against}</p>
        <p className="mb-2">Description: {selectedPlace.description}</p>
        <p className="mb-2">Itinerary: {selectedPlace.itinerary}</p>
      </div>
    </div>
  </div>
)}
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white p-2 rounded-md mx-2"
      >
        Previous Page
      </button>
      <button
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white p-2 rounded-md mx-2"
      >
        Next Page
      </button>
    </div>
  </div>
  );
};

export default Vote;
