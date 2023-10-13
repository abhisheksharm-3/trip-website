"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NavbarLoggedIn from "@/components/Navbar-LoggedIn/page";

type Place = {
  _id: string;
  name: string;
  description: string;
  email: string;
};

const ITEMS_PER_PAGE = 5;

const Approval = () => {
  const [user, setUser] = useState<any | null>(null);
  const [approvalList, setApprovalList] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Place | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post("/api/users/profile");
        setUser(response.data.user);
      } catch (error: any) {
        toast.error(`Error fetching user data: ${error.message}`);
        router.push("/profile");
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (user && user.isAdmin) {
      getApprovalList();
    } else if (user) {
      toast.error("You are not an admin.");
      router.push("/profile");
    }
  }, [user]);

  const getApprovalList = async () => {
    try {
      const response = await axios.post("/api/users/approval");
      setApprovalList(response.data.places);
    } catch (error: any) {
      toast.error(`Error fetching approval list: ${error.message}`);
    }
  };

  const handleAccept = async (item: Place) => {
    try {
      await axios.post(`/api/accept/${item._id}`);
      setApprovalList((prevList) =>
        prevList.filter((i) => i._id !== item._id)
      );
    } catch (error: any) {
      toast.error(`Error accepting the item: ${error.message}`);
    }
  };

  const handleReject = async (item: Place) => {
    try {
      await axios.post(`/api/reject/${item._id}`);
      setApprovalList((prevList) =>
        prevList.filter((i) => i._id !== item._id)
      );
    } catch (error: any) {
      toast.error(`Error rejecting the item: ${error.message}`);
    }
  };

  const openDetailsPopup = (item: Place) => {
    setSelectedItem(item);
  };

  const closeDetailsPopup = () => {
    setSelectedItem(null);
  };

  const totalPages = Math.ceil(approvalList.length / ITEMS_PER_PAGE);
  const itemsToShow = approvalList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-screen h-screen relative bg-[url('/images/bg-3.jpg')] bg-center bg-cover bg-no-repeat">
      <NavbarLoggedIn />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-white font-bold text-2xl mb-4">
          Number of items in approval list: {approvalList.length}
        </h1>
        {itemsToShow.length === 0 ? (
          <h2 className="text-white font-bold text-xl">
            No suggestions to approve or reject.
          </h2>
        ) : (
          <div className="w-full max-w-lg bg-white bg-opacity-80 rounded-md p-4 my-4">
            {itemsToShow.map((item) => (
              <div
                key={item._id}
                className="bg-white p-2 my-2 rounded-md relative"
              >
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-700">{item.email}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleAccept(item)}
                    className="bg-green-500 text-white p-2 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(item)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Reject
                  </button>
                </div>
                <button
                  onClick={() => openDetailsPopup(item)}
                  className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
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

        {selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-4 rounded-md z-10 max-w-md max-h-96 overflow-y-auto">
              <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
              <p className="text-sm text-gray-700">{selectedItem.email}</p>
              <p className="mt-2">{selectedItem.description}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeDetailsPopup}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approval;
