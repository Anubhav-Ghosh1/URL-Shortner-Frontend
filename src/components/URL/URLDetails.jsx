import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getURLDetails, updateURL } from "../../services/operation/urlAPI";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function URLDetails() {
  const { urlId } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [originalURL, setOriginalURL] = useState("");
  const [shortnedURL, setShortnedURL] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchURLDetails();
  }, [urlId]);

  const { token, user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const fetchURLDetails = async () => {
    try {
      const response = await dispatch(getURLDetails(urlId, token));
      const urlData = response;
      console.log(response);
      setUrl(urlData);
      setOriginalURL(urlData.originalURL);
      setShortnedURL(urlData.shortnedURL);
      setCustomAlias(urlData.customAlias || "");
      setIsActive(urlData.isActive);
    } catch (error) {
      console.error("Error fetching URL details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = { urlId, originalURL, customAlias, isActive };
      await dispatch(updateURL(data, token));
      navigate(`/create/@${user.username}`);
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="p-16">
        <div className="p-4 bg-white shadow-md border hover:shadow-xl transition-all ease-in duration-200 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Edit URL</h2>
          {url && (
            <form
              className="flex flex-col items-center"
              onSubmit={handleUpdate}>
              <div className="w-full mb-4">
                <label className="block">Original URL</label>
                <input
                  type="text"
                  value={originalURL}
                  onChange={(e) => setOriginalURL(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="w-full mb-4">
                <label className="block">Shortned URL</label>
                <input
                  type="text"
                  value={shortnedURL}
                  disabled
                  className="p-2 border bg-white rounded w-full"
                />
              </div>
              <div className="w-full mb-4">
                <label className="block">Custom Alias</label>
                <input
                  type="text"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="w-full mb-4">
                <label>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                  <span className="ml-2">Active</span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-all ease-in duration-200">
                Update URL
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default URLDetails;
