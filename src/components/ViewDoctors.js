import React, { useState } from "react";

function ViewDoctors({ contract }) {
  const [doctors, setDoctors] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClick = async () => {
    const list = await contract.viewListOfDoctors();
    setDoctors(list);
    setToggle(!toggle);
  };
  return (
    <div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
          onClick={handleClick}
        >
          {!toggle ? "View List of Doctors" : "Hide List"}
        </button>
      </div>
      {!toggle
        ? null
        : doctors.map((doctor) => {
            return (
              <div key={doctor.doctorID.toNumber()}>
                {doctor.doctorID.toNumber()}: {doctor.doctorName}
              </div>
            );
          })}
    </div>
  );
}
export default ViewDoctors;
