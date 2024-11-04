import React, { useState } from "react";
import { createURL } from "../../services/operation/urlAPI";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function CreateURL() {
  const [originalURL, setOriginalURL] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        originalURL,
        customAlias,
        isActive,
      };
      console.log(data)
      dispatch(createURL(data, token));
      setOriginalURL("");
      setCustomAlias("");
      setIsActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="p-16">
        <div className="p-4 bg-white shadow-md border hover:shadow-xl transition-all ease-in duration-200 rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Create New URL</h2>
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
              <label className="block">Custom Alias</label>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="w-full mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                Active
              </label>
            </div>
            <button type="submit" className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500 transition-all ease-in duration-200">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateURL;
