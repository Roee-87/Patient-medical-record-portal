import React, { useState } from "react";
import PatientResults from "./PatientResults";

function ViewMyRecords({ contract }) {
  const [toggle, setToggle] = useState(false);

  const [obj, setObj] = useState({});
  const [id, setId] = useState(undefined);
  const [prescriptions, setPrescriptions] = useState([]);
  const [conditions, setConditions] = useState([]);

  const handleClick = async () => {
    const data = await contract.viewMyRecords();
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
          onClick={() => {
            handleClick();
          }}
        >
          {!toggle ? "View My Medical Records" : "Hide info"}
        </button>
      </div>

      {toggle ? (
        <PatientResults
          obj={obj}
          id={id}
          prescriptions={prescriptions}
          conditions={conditions}
        />
      ) : null}
    </div>
  );
}

export default ViewMyRecords;
