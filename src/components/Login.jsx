import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
  
      if (res.data.success) {
        dispatch(setAuthUser(res.data.User));
        localStorage.setItem('user', JSON.stringify(res.data.User));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gray-100 overflow-hidden'>
      <form onSubmit={submitHandler} className="flex flex-col gap-3 bg-white p-6 rounded shadow-lg w-[300px]">
        <h1 className='font-bold text-2xl uppercase text-center mb-4'>Login</h1>
        <input
          onChange={changeHandler}
          value={input.email}
          name="email"
          type="email"
          placeholder='Email'
          className='border border-gray-400 rounded-md px-2 py-1'
          required
        />
        <input
          onChange={changeHandler}
          value={input.password}
          name="password"
          type="password"
          placeholder='Password'
          className='border border-gray-400 rounded-md px-2 py-1'
          required
        />
        <button type="submit" className='bg-gray-800 p-2 text-white rounded-md hover:bg-gray-700 transition'>
          Login
        </button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
