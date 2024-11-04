import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteURL,
  fetchUrls,
  toggleURLStatus,
} from "../../services/operation/urlAPI";
import { FaRegCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function Home() {
  const [urls, setUrls] = useState([]);
  const { token } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchURLs();
  }, []);

  const fetchURLs = async () => {
    try {
      const response = await dispatch(fetchUrls(token)); // Adjust endpoint if needed
      setUrls(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (urlId) => {
    try {
      await dispatch(toggleURLStatus(urlId, token));
      fetchURLs(); // Refresh the list after toggling status
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDelete = async (urlId) => {
    try {
      await dispatch(deleteURL(urlId, token));
      fetchURLs(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="md:p-10">
        <div className="border rounded-md shadow-md p-4">
          <h1 className="text-2xl font-bold mb-4">My URLs</h1>
          <Link
            to="/create"
            className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-all ease-in duration-200">
            Create New URL
          </Link>
          <ul className="mt-4">
            {urls.map((url) => (
              <li
                key={url._id}
                className="p-2 group border rounded mb-2 flex justify-between items-center">
                <span className="hidden md:block">{url.originalURL}</span>
                <span className="block md:hidden">
                  {url.originalURL}
                </span>
                {/* <span>{url.shortnedURL}</span> */}
                <div className="space-x-2 flex items-center">
                  <button
                    className="group-hover:visible invisible transition-all ease-in duration-100"
                    onClick={() => {
                      copy(
                        `${process.env.REACT_APP_BASE_URL}/url/redirect/${url?.shortnedURL}`
                      );
                      toast.success("URL copied successfully");
                    }}>
                    <FaRegCopy className="text-xl" />
                  </button>
                  <div className="flex gap-2 flex-col md:flex-row">
                    <button
                      onClick={() => handleToggle(url._id)}
                      className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-pink-600 transition-all ease-in duration-200">
                      {url.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <Link
                      to={`/url/${url._id}`}
                      className="bg-blue-400 text-center text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-all ease-in duration-200">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="bg-red-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-500 transition-all ease-in duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
