function AddPrescription({ contract }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { medID, patientID } = e.target.elements;

    const tx = await contract.addPrescription(patientID.value, medID.value);
    await tx.wait();
    alert("Doctor has prescribed new medication!");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
        <div className="text-gray-600 font-bold text-md mb-2">
          Prescribe Medication:
        </div>
        <div className="w-50 text-gray-600  text-md mb-2">
          <label>Enter Patient ID: </label>

          <input
            className="w-10 border 2 border-rose-500 bg-slate-300"
            type="text"
            id="patientID"
            required
          />
        </div>

        <div className="text-gray-600  text-md mb-2">
          <label>Enter Medication ID: </label>
          <input
            className="w-10 border 2 border-rose-500 bg-slate-300"
            type="text"
            id="medID"
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
export default AddPrescription;
