import "../styles/pages/DashboardForm.scss";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConnectButton from "../components/ConnectButton";
import img from "../images/patient.svg";
import img1 from "../images/doctor.svg";
import img2 from "../images/pharmacy.svg";


export default function DashboardForm(params) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    if (id !== "Patient" && id !== "Hospital" && id !== "Pharmacy") {
        navigate("/dashboard");
    }
  }, [id, navigate]);

  const [input, setInput] = useState({
    Type: id,
    Name: "",
    Age: "",
    "Blood Group": "",
    Address: "",
    "Phone Number": "",
    Email: "",
    "License Number": "",
  });

  const data = {
    Patient: [
      ["Name", (e) => setInput({ ...input, Name: e.target.value })],
      ["Age", (e) => setInput({ ...input, Age: e.target.value })],
      [
        "Blood Group",
        (e) => setInput({ ...input, "Blood Group": e.target.value }),
      ],
      ["Address", (e) => setInput({ ...input, Address: e.target.value })],
      [
        "Phone Number",
        (e) => setInput({ ...input, "Phone Number": e.target.value }),
      ],
      ["Email", (e) => setInput({ ...input, Email: e.target.value })],
    ],
    Hospital: [
      ["Name", (e) => setInput({ ...input, Name: e.target.value })],
      ["Address", (e) => setInput({ ...input, Address: e.target.value })],
      [
        "Phone Number",
        (e) => setInput({ ...input, "Phone Number": e.target.value }),
      ],
      ["Email", (e) => setInput({ ...input, Email: e.target.value })],
      [
        "License Number",
        (e) => setInput({ ...input, "License Number": e.target.value }),
      ],
    ],
    Pharmacy: [
      ["Name", (e) => setInput({ ...input, Name: e.target.value })],
      ["Address", (e) => setInput({ ...input, Address: e.target.value })],
      [
        "Phone Number",
        (e) => setInput({ ...input, "Phone Number": e.target.value }),
      ],
      ["Email", (e) => setInput({ ...input, Email: e.target.value })],
      [
        "License Number",
        (e) => setInput({ ...input, "License Number": e.target.value }),
      ],
    ],
  };


  function Input({ label, value, onChange }) {
    return (
      <div className="label_container">
        <label className="label_container__label">{label} *</label>
        <input
          type="text"
          className="label_container__input_text"
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="dashboard_form_container">
        <div className="dashboard_form_container__img">
            {
                id === "Patient" ? <img src={img} alt="patient" /> : id === "Hospital" ? <img src={img1} alt="hospital" /> : <img src={img2} alt="pharmacy" />
            }
        </div>
        <div className="dashboard_form_container__form">
          {
            data[id]?.map((val, ind) => {
              return (
                <Input
                  label={val[0]}
                  value={input[val[0]]}
                  onChange={val[1]}
                  key={ind}
                ></Input>
              );
            })}
            <ConnectButton height="40px" width="100px" text="Submit"></ConnectButton>
        </div>
      </div>
    </>
  );
}
