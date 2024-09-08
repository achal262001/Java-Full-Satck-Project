import React from "react";
import { useState } from "react";
import axios from "axios";

function AddUser({ onClose }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const addUser = async (e) => {
    e.preventDefault();
    if (Object.values(userInfo).every((value) => value !== "")) {
      console.log(userInfo);
      await axios
        .post("http://localhost:8080/user", userInfo)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
      onClose();
    }
  };

  const changeHandle = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
      <div className="bg-violet-700 w-72 m-2 p-2 rounded-xl">
        <div className="flex justify-center p-2 w-full items-center">
          <h1 className="text-xl text-white">User Form</h1>
        </div>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="rounded-xl p-1"
            onChange={(e) => changeHandle(e)}
          />
          <input
            type="text"
            name="phoneNumber"
            className="rounded-xl p-1"
            placeholder="Phone Number"
            onChange={(e) => changeHandle(e)}
          />
          <input
            type="email"
            name="email"
            className="rounded-xl p-1"
            placeholder="E-mail"
            onChange={(e) => changeHandle(e)}
          />
          <div className="flex justify-evenly p-1 w-full items-center">
            <button
              onClick={onClose}
              className="bg-yellow-400 border border-white p-1 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={addUser}
              className="bg-yellow-400 border border-white p-1 rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
