import React from "react";

function PatientResultsForDoctor({ obj, id, prescriptions, conditions }) {
  //console.log(obj);
  console.log(prescriptions);
  return (
    <div>
      <div>Patient ID: {id}</div>
      <div>Patient Name: {obj.patientName}</div>
      <div>Patient Gender: {obj.patientGender}</div>
      <div>Patient Age: {obj.patientAge}</div>
      <div>
        <div className="font-bold">Patient Conditions: </div>
        <div className="border">
          {conditions.map((condition) => {
            return <div key={condition}>{condition}</div>;
          })}
        </div>
      </div>
      <div>
        <div className="font-bold">Patient Prescriptions:</div>
        {prescriptions.map((item) => {
          return (
            <div key={item.medicationId.toNumber()} className="border">
              <div>Medication ID: {item.medicationId.toNumber()}</div>
              <div>Medication name: {item.medicationName}</div>
              <div>Expiration date: {item.expirationDate}</div>
              <div>Dosage: {item.dosage}</div>
              <div>Price: ${item.price.toNumber()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default PatientResultsForDoctor;
