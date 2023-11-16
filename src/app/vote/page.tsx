"use client";
// Import necessary modules and components
import React, { useState, useEffect } from "react";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define Place and Votes interfaces
interface Place {
  _id: string;
  name: string;
  description: string;
  email: string;
  votesInFavour: number;
  votesAgainst: number;
  itinerary: string;
  voters: string;
}

interface Votes {
  [key: string]: {
    inFavor: number;
    against: number;
  };
}

// Set the number of items per page
const ITEMS_PER_PAGE = 6;

// Define the PlaceDialog component
const PlaceDialog: React.FC<{ place: Place; onClose: () => void }> = ({ place, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 max-w-screen max-h-screen mx-4 my-16 rounded-lg shadow-lg overflow-hidden text-white">
        <h2 className="text-2xl font-extrabold mb-4 text-blue-500 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {place.name}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div>
            <p className="text-blue-200 mb-4 break-all max-h-64 overflow-y-auto">
              Description: {place.description}
            </p>
            <p className="text-gray-500 mb-2 break-all">Email: {place.email}</p>
            <p className="text-green-500 mb-2 break-all">
              Votes in Favor: {place.votesInFavour}
            </p>
            <p className="text-red-500 mb-2 break-all">
              Votes Against: {place.votesAgainst}
            </p>
            <p className="text-gray-500 mb-2 break-all">
              Voters: {place.voters}
            </p>
          </div>

          {/* Right column */}
          <div>
            <p className="text-gray-500 mb-2 break-all max-h-64 overflow-y-auto">
              Itinerary: {place.itinerary}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Define the Vote component
const Vote = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [votes, setVotes] = useState<Votes>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userEmail, setUserEmail] = useState("");
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

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post("/api/users/profile");
        const userEmail = response.data.user.email;
        setUserEmail(userEmail);
      } catch (error: any) {
        toast.error(
          `Error fetching user data: ${error.message}, Taking you back to Profile Home!`
        );
        await router.push("/profile");
      }
    };

    getUserData();
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
        .post("/api/users/voteChange", { placeId, type, userEmail })
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

  const handleToggleDetails = (place: Place) => {
    setSelectedPlace(place);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlace(null);
  };

  const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE);
  const itemsToShow = places.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[url('/images/bg-1-dark.jpg')] bg-center bg-cover bg-no-repeat brightness-90 relative">
      <div className="z-10">
        <NavbarLoggedIn />
      </div>
      <div className="flex items-center flex-col justify-between h-[70vh] w-screen absolute">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white text-center">
          🌟 Vote For Your Favorite Destinations Here! 🌍✈️
        </h1>
        <div className="">
          {places.length === 0 ? (
            <p className="text-white text-center">
              No places approved by admin yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center place-items-center">
              {itemsToShow.map((place) => (
                <li
                  key={place._id}
                  className="mb-4 cursor-pointer"
                  onClick={() => handleToggleDetails(place)}
                >
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {truncateText(place.name, 20)}
                    </h3>
                    <p className="mb-2">Email: {place.email}</p>
                    <p className="mb-2">In Favor: {votes[place._id].inFavor}</p>
                    <p className="mb-2">Against: {votes[place._id].against}</p>
                  </div>
                  <div className="mt-2 flex flex-col md:flex-row justify-center md:justify-between items-center">
                    <button
                      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2 ${
                        place.voters.includes(userEmail) &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleVote(place._id, "inFavor")}
                      disabled={place.voters.includes(userEmail)}
                      aria-label={
                        place.voters.includes(userEmail)
                          ? "Already Voted"
                          : "Vote in Favor"
                      }
                    >
                      {place.voters.includes(userEmail)
                        ? "Already Voted"
                        : "Vote in Favor"}
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2"
                      onClick={() => handleVote(place._id, "against")}
                      aria-label="Vote Against"
                    >
                      Vote Against
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedPlace && (
          <PlaceDialog place={selectedPlace} onClose={handleClosePopup} />
        )}
        <p className="text-sm md:text-lg mt-4 text-white text-center">
          Choose wisely, because these destinations are competing for the title
          of{" "}
          <span className="text-red-500 font-bold">
            &quot;Best Vacation Spot Ever&quot;
          </span>{" "}
          🏆 and we always want to set a benchmark.
        </p>
      </div>
    </div>
  );
};

export default Vote;
