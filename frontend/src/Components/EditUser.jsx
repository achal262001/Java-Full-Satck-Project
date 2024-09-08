import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function EditUser({ onClose, id }) {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const { name, phoneNumber, email } = userInfo;
  const loadUser = async () => {
    await axios
      .get(`http://localhost:8080/user/${id}`)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error(err.message));
  };
  useEffect(() => {
    loadUser();
  }, []);
  const editUser = async (e) => {
    e.preventDefault();
    // console.log(id);
    await axios
      .put(`http://localhost:8080/user/${id}`, userInfo)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    onClose();
  };
  //   console.log(user);

  const changeHandle = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
      <div className="bg-violet-700 w-72 m-2 p-2 rounded-xl">
        <div className="flex justify-center p-2 w-full items-center">
          <h1 className="text-xl text-white">Edit User Form</h1>
        </div>
        <form className="flex flex-col gap-4">
          {/* <input
            type="text"
            value={user.name}
            name="name"
            placeholder="Name"
            className="rounded-xl p-1"
            onChange={(e) => changeHandle(e)}
          /> */}
          <input
            type="text"
            value={name}
            name="name"
            placeholder="Name"
            className="rounded-xl p-1"
            onChange={(e) => changeHandle(e)}
          />
          <input
            type="text"
            value={phoneNumber}
            name="phoneNumber"
            className="rounded-xl p-1"
            placeholder="Phone Number"
            onChange={(e) => changeHandle(e)}
          />
          <input
            type="email"
            name="email"
            value={email}
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
              onClick={(e) => editUser(e, id)}
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

export default EditUser;
