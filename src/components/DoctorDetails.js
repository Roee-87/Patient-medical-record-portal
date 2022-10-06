import React from "react";

function DoctorDetails({ doc, ID_ }) {
  return (
    <div>
      <div>Doctor ID: {ID_}</div>
      <div>Doctor Name: {doc.doctorName}</div>
      <div>Specialty: {doc.specialty}</div>
      <div>Location: {doc.workplace}</div>
    </div>
  );
}
export default DoctorDetails;
