const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatientRecord unit tests", function () {
  let myContract,
    accounts,
    patient_,
    doctor_,
    deployer,
    myContract_p, //patient instance
    myContract_d; //doctor instance

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    patient_ = accounts[1];
    doctor_ = accounts[2];

    const contract = await ethers.getContractFactory("PatientRecord", deployer);
    myContract = await contract.deploy();
    myContract_p = myContract.connect(patient_);
    myContract_d = myContract.connect(doctor_);
  });

  //this test checks both registerNewPatient() and viewMyRecords()
  describe("RegisterNewPatient", function () {
    it("registers patient and assigns correct ID#, name, gender, and age to the patient", async () => {
      const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
      await tx.wait();
      const results = await myContract_p.viewMyRecords();
      assert.equal(results.patientID, 1);
      assert.equal(results.patientName, "Bob");
      assert.equal(results.patientGender, 0);
      assert.equal(results.patientAge, 24);
    });
  });

  describe("updateMyAge", function () {
    it("updates the patient's age", async () => {
      const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
      await tx.wait();
      await expect(myContract_p.updateMyAge(0)).to.be.revertedWith(
        "Value must be greater than 0!"
      );
      await myContract_p.updateMyAge(25);
      const results = await myContract_p.viewMyRecords();
      assert.equal(results.patientAge, 25);
    });
  });

  //this test checks both registerNewDoctor and viewListofDoctors()
  describe("RegisterNewDoctor", function () {
    it("registers a new doctor", async () => {
      //register new doctor
      const tx = await myContract_d.registerNewDoctor(
        "Dr. Greg House",
        "Infectious Diseases",
        "Memorial Hospital"
      );
      await tx.wait();
      //register the patient so the patient can veiw the doctor list
      const tx_ = await myContract_p.registerNewPatient("Bob", 0, 24);
      await tx_.wait();
      const results = await myContract_p.viewListOfDoctors();
      assert.equal(results[0].doctorName, "Dr. Greg House");
      assert.equal(results[0].doctorID.toNumber(), 1);
      assert.equal(results[0].specialty, "Infectious Diseases");
      assert.equal(results[0].workplace, "Memorial Hospital");
    });

    describe("approveDoctor", function () {
      it("lets a patient approve a doctor", async () => {
        //register patient
        const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
        await tx.wait();
        //register doctor
        const tx_ = await myContract_d.registerNewDoctor(
          "Dr. Greg House",
          "Infectious Diseases",
          "Memorial Hospital"
        );
        await tx_.wait();
        //have doctor call on function that requires approval -- expect error revert
        await expect(myContract_d.viewPatientRecords(1)).to.be.revertedWith(
          "Doctor does not have approval to treat this patient"
        );
        //have patient approve doctor
        await myContract_p.approveDoctor(1);
        //have doctor call on any function that requires approval
        await myContract_d.connect(doctor_);
        const results = await myContract_d.viewPatientRecords(1);
        assert.equal(results.patientName, "Bob");
      });
    });
    describe("getDoctorDetails", function () {
      it("allows patients to see an individual doctor's details", async () => {
        //register patient
        const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
        await tx.wait();
        //register doctor
        const tx_ = await myContract_d.registerNewDoctor(
          "Dr. Greg House",
          "Nephrology",
          "Princeton NJ Hospital"
        );
        await tx_.wait();
        //have patient call on the getDoctorDetails function
        const results = await myContract_p.getDoctorDetails(1);
        assert.equal(results.doctorID, 1);
        assert.equal(results.doctorName, "Dr. Greg House");
        assert.equal(results.specialty, "Nephrology");
        assert.equal(results.workplace, "Princeton NJ Hospital");
      });
    });
    describe("addCondition", function () {
      it("allows approved doctors to add conditions to the patient records", async () => {
        //register patient
        await myContract_p.connect(patient_);
        const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
        await tx.wait();
        //register doctor
        const tx_ = await myContract_d.registerNewDoctor(
          "Dr. Greg House",
          "Infectious Diseases",
          "Memorial Hospital"
        );
        await tx_.wait();
        //have doctor call on function that requires approval -- expect error revert
        await expect(
          myContract_d.addCondition("Migraines", 1)
        ).to.be.revertedWith(
          "Doctor does not have approval to treat this patient!"
        );
        //have patient approve doctor
        await myContract_p.approveDoctor(1);
        //have doctor add diagnoses to the patient's records and verify
        await myContract_d.connect(doctor_);
        const tx_2 = await myContract_d.addCondition("Type II Diabetes", 1);
        await tx_2.wait();
        const tx_3 = await myContract_d.addCondition("Asthma", 1);
        await tx_3.wait();
        const results = await myContract_d.viewPatientRecords(1);
        assert.equal(results.conditions[0], "Type II Diabetes");
        assert.equal(results.conditions[1], "Asthma");
        //have patient verify diagnosis
        const results_2 = await myContract_p.viewMyRecords();
        assert.equal(results_2.conditions[0], "Type II Diabetes");
        assert.equal(results_2.conditions[1], "Asthma");
      });
    });
    // checks both addMedication() and viewListofMedications()
    describe("addMedication", function () {
      it("allows doctors to add new medications to the list of medications", async () => {
        const tx_ = await myContract_d.registerNewDoctor(
          "Dr. Greg House",
          "Infectious Diseases",
          "Memorial Hospital"
        );
        await tx_.wait();
        const tx = await myContract_d.addMedication(
          241,
          "Insulin",
          "08/30/2023",
          "once a day",
          100
        );
        await tx.wait();
        const results = await myContract_d.viewListofMedications();
        assert.equal(results[0].medicationId, 241);
        assert.equal(results[0].medicationName, "Insulin");
        assert.equal(results[0].expirationDate, "08/30/2023");
        assert.equal(results[0].dosage, "once a day");
        assert.equal(results[0].price, 100);

        //reverts if patient tries to add medication
        await myContract_p.registerNewPatient("Bob", 0, 24);
        await expect(
          myContract_p.addMedication(
            24,
            "Tylenol",
            "04/30/2023",
            "once a day",
            50
          )
        ).to.be.revertedWith("Not a doctor!");
      });
    });

    describe("addPrescription", function () {
      it("allows approved doctors to prescribe medication", async () => {
        //create patient
        const tx = await myContract_p.registerNewPatient("Bob", 0, 24);
        await tx.wait();
        //create doctor
        const tx_ = await myContract_d.registerNewDoctor(
          "Dr. Greg House",
          "Infectious Diseases",
          "Memorial Hospital"
        );
        await tx_.wait();
        //doctor creates medication
        const tx_1 = await myContract_d.addMedication(
          241,
          "Insulin-a",
          "08/30/2023",
          "once a day",
          100
        );
        await tx_1.wait();
        //doctor tries to prescribe medication to "Bob" without aproval
        await expect(myContract_d.addPrescription(1, 241)).to.be.revertedWith(
          "Doctor does not have approval to treat this patient!"
        );
        //have patient approve the doctor
        await myContract_p.approveDoctor(1);
        //now have the Doctor add the new prescpription
        await myContract_d.addPrescription(1, 241);
        const results = await myContract_d.viewPatientRecords(1);
        assert.equal(results.prescriptions[0].medicationId, 241);
        assert.equal(results.prescriptions[0].medicationName, "Insulin-a");
        //adding a nonexistent medication reverts with error
        await expect(myContract_d.addPrescription(1, 24)).to.be.revertedWith(
          "Medication not registered!"
        );
      });
    });
  });
});
