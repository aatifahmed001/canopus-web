import React from "react";
import PatientList from "./PatientList";
import Config from "../../services/config";

const Patients = (props) => {
  return <PatientList patientListLetConfig={new Config().patientListLetConfig()} {...props} />;
}

export default Patients;