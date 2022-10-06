function UpdatePatientAge({ contract }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { age } = e.target.elements;
    await contract.updateMyAge(age.value);
    alert("Patient Age successfully updated!");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className="h-18 w-49
         border-4 rounded border-gray-400"
        >
          <label>Update Patient Age: </label>
          <div>
            <input
              className="w-20 border 2 border-rose-500 bg-slate-300"
              type="number"
              id="age"
              required
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default UpdatePatientAge;
