import React from "react";

function RegisterNewDoctor({ contract }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, specialty, location } = e.target.elements;
    const tx = await contract.registerNewDoctor(
      name.value,
      specialty.value,
      location.value
    );
    await tx.wait();

    alert("New Doctor Registered!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-md mb-2">
          Register New Doctor:
        </div>
        <div className="text-gray-600  text-md mb-2">
          <label>Doctor Full Name: </label>

          <input
            className="border 2 border-rose-500 bg-slate-300"
            type="text"
            id="name"
            required
          />
        </div>

        <div className="text-gray-600  text-md mb-2">
          <label>Specialty: </label>
          <input
            className="border 2 border-rose-500 bg-slate-300"
            type="text"
            id="specialty"
            required
          />
        </div>
        <div className="text-gray-600  text-md mb-2">
          <label>Location: </label>
          <input
            className="border 2 border-rose-500 bg-slate-300"
            type="text"
            id="location"
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
export default RegisterNewDoctor;
