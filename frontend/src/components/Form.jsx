import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import Input from "./Input";

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
        ></ConnectButton>
      </div>
    </>
  );
}
