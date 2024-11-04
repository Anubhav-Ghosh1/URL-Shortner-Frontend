import React from "react";
import ErrorIcon from "../assets/Error.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ErrorPage(props) {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.profile);
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <img src={ErrorIcon} alt="" />
      <button
        onClick={() => {
          const toastId = toast.loading("Loading");
          if (!token) {
            setTimeout(() => {
              toast.dismiss(toastId);
              navigate("/login");
            }, 3000);
            return;
          }
          //   const toastId = toast.loading("Loading");
          setTimeout(() => {
            toast.dismiss(toastId);
            navigate(`/create/@${user?.username}`);
          }, 1000);
        }}
        className="bg-yellow-300 hover:bg-yellow-400 transition-all ease-in duration-200 px-4 py-2 rounded-md font-semibold">
        Homepage
      </button>
    </div>
  );
}

export default ErrorPage;
