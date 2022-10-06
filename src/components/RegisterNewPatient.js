import React from "react";

function RegisterNewPatient({ contract }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, gender, age } = e.target.elements;
    let details = {
      name: name.value,
      gender: gender.value,
      age: age.value,
    };
    const tx = await contract.registerNewPatient(
      details.name,
      details.gender,
      details.age
    );
    await tx.wait();
    console.log(
      typeof details.name,
      typeof parseInt(details.gender),
      typeof parseInt(details.age)
    );
    alert("New Patient Registered!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-md mb-2">
          Register New Patient:
        </div>

        <label>Full Name: </label>

        <input
          className="border 2 border-rose-500 bg-slate-300"
          type="text"
          id="name"
          required
        />

        <div>
          <label>Gender: </label>
          <input
            className="border 2 border-rose-500 bg-slate-300"
            type="text"
            id="gender"
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            className="border 2 border-rose-500 bg-slate-300"
            type="number"
            id="age"
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default RegisterNewPatient;
