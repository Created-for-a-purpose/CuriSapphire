import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import Input from "./Input";
import { dataAddress, dataAbi } from "./../constants"
import { writeContract } from "wagmi/actions"
import { keccak256 } from "viem";

export default function Form() {
  const { id: initialId } = useParams();
  const [id, setId] = useState(initialId);
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
  useEffect(() => {
    setId(initialId);
  }, [id, initialId]);
  const data = {
    patient: [
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
    hospital: [
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
    pharmacy: [
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

  const clearFields = () => {
    setInput({
      Type: id,
      Name: "",
      Age: "",
      "Blood Group": "",
      Address: "",
      "Phone Number": "",
      Email: "",
      "License Number": "",
    })
  }

  const check = () => {
    if (id === "patient") {
      if (
        input.Name === "" ||
        input.Age === "" ||
        input["Blood Group"] === "" ||
        input.Address === "" ||
        input["Phone Number"] === "" ||
        input.Email === ""
      ) {
        alert("Please fill all the fields");
        return false;
      } 
    }
    else {
      if (
        input.Name === "" ||
        input.Address === "" ||
        input["Phone Number"] === "" ||
        input.Email === "" ||
        input["License Number"] === ""
      ) {
        alert("Please fill all the fields");
        return false;
      }
    }
    return true;
  }

  const submit = async () => {
    if(!check()) return;

    if (id === "patient") {
      const name = input.Name;
      const age = input.Age;
      const bloodGroup = input["Blood Group"];
      const address = input.Address;
      const phoneNumber = input["Phone Number"];
      const email = input.Email;
      
      try{
      await writeContract({
        address: dataAddress,
        abi: dataAbi,
        functionName: "addPatientData",
        args: [name, age, bloodGroup, address, phoneNumber, email],
      })
      clearFields();
    } catch(e) { console.log(e) } 
    }
    else if (id === "hospital") {
      const name = input.Name;
      const address = input.Address;
      const phoneNumber = input["Phone Number"];
      const email = input.Email;
      const licenseNumber = input["License Number"];

      try{
      await writeContract({
        address: dataAddress,
        abi: dataAbi,
        functionName: "addHospitalData",
        args: [name, address, phoneNumber, email, licenseNumber],
      })
      clearFields();
    } catch(e) { console.log(e) }
    }
    else if (id === "pharmacy") {
      const name = input.Name;
      const address = input.Address;
      const phoneNumber = input["Phone Number"];
      const email = input.Email;
      const licenseNumber = input["License Number"];

      try{
      await writeContract({
        address: dataAddress,
        abi: dataAbi,
        functionName: "addPharmacyData",
        args: [name, address, phoneNumber, email, licenseNumber],
      })
      clearFields();
    } catch(e) { console.log(e) }
    }
    
  }

  return (
    <>
      <div className="dashboard_form_container__form">
        {data[id]?.map((val, ind) => {
          return (
            <Input
              label={val[0]}
              value={input[val[0]]}
              onChange={val[1]}
              key={ind}
            ></Input>
          );
        })}
        <ConnectButton
          height="40px"
          width="100px"
          text="Submit"
          clickHandle={submit}
        ></ConnectButton>
      </div>
    </>
  );
}
