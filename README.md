Decentralized Medical Records Database

This project is a demonstration of how a medical records database can be deployed on the ethereum blockchain.  
The smart contract code is written using Solidity version 0.8.17 and is commented using the recommended NatSpec guidelines. The smartcontract was deployed to the Goerli testnet but can also be easily deployed on a local development blockchain.

The front end makes use of the react-app template and provides a basic user interface to allow patients and doctors to interact with the smart contract.

Future versions of this App will require and admin. Since the purpose of this project is to demonstrate functionality and allow users to interact with the smartcontract freely, admin restrictions on who can register as a patient and a doctor have been ommitted. Anybody can currently register as a doctor or a patient, even with the same address -- though this is discouraged (though it makes exploring app functionality less of a headache as users do not need to manually switch accounts with their wallet).

Users need to have MetaMask or an alternative wallet installed. Users will be automatically prompted to connect an account when accessing the website. Goerli network must be selected in order to use the website to interact with the smartcontract.

Certain features are restricted to patient only access; others to doctor only access. Patient access is denoted by blue buttons, and doctor access is denoted with green buttons. Error messages are displayed in the browser console.

Patients can register and have the ability to update their age, view a list of registered doctors, view details of a particular doctor (specialty and location), approve a registered doctor to allow them to add diagnosed conditions and prescriptions to the patient's medical records, and view their medical records. Doctors are unable to diagnose patients or prescribe medications to patients that have not granted those doctors prior approval to do so.

Doctors can register and add new medications to the medications database. They have access to view the full list of medications that have been added to the database. Once a patient has approved a doctor, that doctor can add diagnosed conditions to a patient's medical records. They are also able to prescribe medications by using the medication ID number. Doctors can view the medical records of any patient after that patient has granted approval.

The smartcontract code was tested using the Remix IDE in conjucntion with unit testing. Unit testing was performed using the recommended guidelines provided by Hardhat and can be reviewed in the test/contract.test.js file.

Source code for the smartcontract can be found in the "contracts" folder: PatientRecord.sol.
Source code for the front end can be found in the "src" folder.

Website url: https://gentle-cannoli-dc76be.netlify.app/

Goerli testnet address: 0xc7c140C7c3795206D5fbDD55fa7B30Ce219d4EF2

Goerli etherscan: https://goerli.etherscan.io/address/0xc7c140C7c3795206D5fbDD55fa7B30Ce219d4EF2#code

After deployment, I registered a doctor to the website and added some sample medications that users may choose to interact with.

Doctor ID: 1
Doctor Name: Dr. Gregory House
Specialty: Nephrology
Location: Princeton Memorial

Medication ID Number: 24
Medication Name: Albuterol
Expiration Date: 10/31/2023
Dosage: Once a day prior to exercise
Price: $25

Medication ID Number: 4118
Medication Name: Statin
Expiration Date: 05/31/2025
Dosage: Once a day
Price: $350
