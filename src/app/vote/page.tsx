"use client";
import React, { useState, useEffect, useMemo } from "react";
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
  voters: string;
}

interface Votes {
  [key: string]: {
    inFavor: number;
    against: number;
  };
}

const ITEMS_PER_PAGE = 6;

const Vote = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [votes, setVotes] = useState<Votes>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
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
        router.push("/profile");
      }
    };

    getUserData();
  });

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
                <li key={place._id} className="mb-4">
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
                      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2 ${place.voters.includes(userEmail) && 'opacity-50 cursor-not-allowed'}`}
                      onClick={() => handleVote(place._id, "inFavor")}
                      disabled={place.voters.includes(userEmail)}
                      aria-label={place.voters.includes(userEmail) ? "Already Voted" : "Vote in Favor"}
                    >
                      {place.voters.includes(userEmail) ? "Already Voted" : "Vote in Favor"}
                    </button>
  
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2"
                      onClick={() => handleVote(place._id, "against")}
                      aria-label="Vote Against"
                    >
                      Vote Against
                    </button>
                    {selectedPlace && (
                      <button
                        onClick={() => handleToggleDetails(place)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md ml-2"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
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
