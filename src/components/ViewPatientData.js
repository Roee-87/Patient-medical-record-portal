import React, { useState } from "react";

import PatientResultsForDoctor from "./PatientResultsForDoctor";

function ViewPatientData({ contract }) {
  const [toggle, setToggle] = useState(false);
  const [obj, setObj] = useState({});
  const [id, setId] = useState(undefined);
  const [prescriptions, setPrescriptions] = useState([]);
  const [conditions, setConditions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientID } = e.target.elements;

    const data = await contract.viewPatientRecords(patientID.value);
    const num = data.patientID;
    setPrescriptions(data.prescriptions);
    setConditions(data.conditions);
    setId(num.toNumber());
    setObj(data);
    setToggle(!toggle);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="text-gray-600  text-md mb-2">
            <label>Enter Patient ID Number: </label>
            <input
              className="w-10 border 2 border-rose-500 bg-slate-300"
              type="text"
              id="patientID"
              required
            />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded-full">
            {!toggle ? "View patient Medical Records" : "Hide Info"}
          </button>
        </form>
      </div>

      {toggle ? (
        <PatientResultsForDoctor
          obj={obj}
          id={id}
          prescriptions={prescriptions}
          conditions={conditions}
        />
      ) : null}
    </div>
  );
}

export default ViewPatientData;
