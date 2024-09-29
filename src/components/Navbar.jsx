import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { searchText, setAuthUser } from "../redux/appSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Navbar = () => {
  const [text, setText] = useState("");
  const { user } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigate for redirection

  const logoutHandler = async () => {
    try {
      // Send logout request to backend
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
      
      if (res.data.success) {
        // Remove user data from local storage and redux state
        localStorage.removeItem("user"); // Clear user from local storage
        dispatch(setAuthUser(null)); // Reset auth user in Redux
        
        toast.success(res.data.message);

        // Redirect to the login page after logout
        navigate("/login"); 
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while logging out.");
    }
  };

  useEffect(() => {
    dispatch(searchText(text));
  }, [text, dispatch]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <RxHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
            alt="Gmail Logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      {user && ( // Only show search bar and avatar if user is logged in
        <>
          <div className="w-[50%] mr-60">
            <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
              <IoIosSearch size={"24px"} className="text-gray-700" />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search mail"
                className="rounded-full w-full bg-transparent outline-none px-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <IoIosSettings size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>
            <span onClick={logoutHandler} className="underline cursor-pointer">
              Logout
            </span>
            <Avatar
              src={user?.profilePhoto} // Use User's profile photo or a default
              size="40"
              round={true}
              className="cursor-pointer" // Optional: Add a cursor pointer for better UX
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
