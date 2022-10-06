import React, { useState } from "react";
import DoctorDetails from "./DoctorDetails";

function GetDoctorDetails({ contract }) {
  const [doc, setDoc] = useState({});
  const [toggle, setToggle] = useState(false);
  const [ID_, setID_] = useState(undefined);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = e.target.elements;

    const data = await contract.getDoctorDetails(id.value);
    const val = data.doctorID;
    setID_(val.toNumber());
    setDoc(data);
    setToggle(!toggle);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-18 w-68 border-4 rounded border-gray-400">
        <label>Enter Doctor ID Number: </label>
        <div>
          <input
            className="w-20 border 2 border-rose-500 bg-slate-300"
            type="number"
            id="id"
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
          type="submit"
        >
          {!toggle ? "View Doctor Details" : "Hide info"}
        </button>
        {toggle ? <DoctorDetails doc={doc} ID_={ID_} /> : null}
      </div>
    </form>
  );
}

export default GetDoctorDetails;
