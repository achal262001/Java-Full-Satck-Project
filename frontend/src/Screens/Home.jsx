import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "../Components/AddUser";
import EditUser from "../Components/EditUser";

function Home() {
  const [showPatient, setShowPatient] = useState(false);
  const [user, setUser] = useState([]);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [id, setId] = useState("");

  const fetchUser = async () => {
    await axios
      .get("http://localhost:8080/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchUser();
  }, [showEditPatient, showPatient]);

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-blue-600 relative text-white h-16 flex justify-center items-center">
        <h1>JAVA FULL STACK PROJECT</h1>
        <button
          onClick={() => setShowPatient(true)}
          className="border absolute right-2 border-white rounded-xl p-1 bg-blue-800"
        >
          Add User
        </button>
      </div>
      <div className="relative m-2 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Serial Number
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Custom Options
              </th>
            </tr>
          </thead>
          {user.map((user, index) => {
            return (
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => (setShowEditPatient(true), setId(user.id))}
                      className="bg-yellow-400 px-2 py-1 rounded-xl border border-blue-700"
                    >
                      Edit
                    </button>
                    <button className="bg-yellow-400 px-2 py-1 rounded-xl border border-blue-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {showPatient && <AddUser onClose={() => setShowPatient(false)} />}
      {showEditPatient && (
        <EditUser id={id} onClose={() => setShowEditPatient(false)} />
      )}
    </div>
  );
}

export default Home;
