import dashlets from '../assets/config/dashlets';
import patientlets from '../assets/config/patientlets';

class Config {
  dashLetConfig = () => {
    return dashlets;
  };
  patientListLetConfig = () => {
    return patientlets;
  };
}

export default Config;