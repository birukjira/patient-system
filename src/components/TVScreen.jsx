import { useParams } from "react-router-dom";
import PatientDisplay from "./PatientDisplay";

const TVScreen = () => {
  const { department } = useParams();
  return <PatientDisplay department={department} />;
};

export default TVScreen;
