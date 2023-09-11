import "../styles/pages/DashboardForm.scss";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../images/patient.svg";
import img1 from "../images/doctor.svg";
import img2 from "../images/pharmacy.svg";
import Form from "../components/Form";


export default function DashboardForm(params) {
  const { id : initialId } = useParams();
  const [id, setId] = useState(initialId);
  const navigate = useNavigate();

  useEffect(() => {
    setId(initialId);
    if (id.toLocaleLowerCase() !== "patient" && id.toLocaleLowerCase() !== "hospital" && id.toLocaleLowerCase() !== "Pharmacy") {
      navigate("/dashboard");
    }
  }, [id, navigate, initialId]);



  return (
    <>
      <Navbar/>
      <div className="dashboard_form_container">
        <div className="dashboard_form_container__img">
            {
                id === "patient" ? <img src={img} alt="patient" /> : id === "hospital" ? <img src={img1} alt="hospital" /> : <img src={img2} alt="pharmacy" />
            }
        </div>
        <Form></Form>
      </div>
    </>
  );
}
