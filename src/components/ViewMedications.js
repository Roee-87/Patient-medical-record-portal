import React, { useState } from "react";

function ViewMeds({ contract }) {
  const [meds, setMeds] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClick = async () => {
    const list = await contract.viewListofMedications();
    setMeds(list);
    setToggle(!toggle);
  };
  return (
    <div>
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded-full"
          onClick={handleClick}
        >
          {!toggle ? "View List of Medications" : "Hide List"}
        </button>
      </div>
      {!toggle
        ? null
        : meds.map((med) => {
            return (
              <div key={med.medicationId.toNumber()} className="border">
                <div> Medication ID Number: {med.medicationId.toNumber()}</div>
                <div> Medication Name: {med.medicationName} </div>
                <div> Expiration Date: {med.expirationDate} </div>
                <div> Dosage: {med.dosage} </div>
                <div>Price: ${med.price.toNumber()} </div>
              </div>
            );
          })}
    </div>
  );
}
export default ViewMeds;
