import React from "react";
function AddDiagnosis({ contract }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientId, condition } = e.target.elements;

    const tx = await contract.addCondition(condition.value, patientId.value);
    await tx.wait();
    alert("Doctor has added a new diagnosis!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-30 border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-md mb-2">
          Add Diagnosis
        </div>
        <div className="text-gray-600  text-md mb-2">
          <label>Enter Patient ID: </label>

          <input
            className="w-30 border 2 border-rose-500 bg-slate-300"
            type="text"
            id="patientId"
            required
          />
        </div>

        <div className="text-gray-600  text-md mb-2">
          <label>Enter Diagnosis: </label>
          <input
            className="w-30 border 2 border-rose-500 bg-slate-300"
            type="text"
            id="condition"
            required
          />
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default AddDiagnosis;
