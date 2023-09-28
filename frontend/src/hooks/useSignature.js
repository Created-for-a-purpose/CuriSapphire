import { useContext } from "react";
import SignatureContext from "../context/SignatureContext";

export default function useSignature() {
  return useContext(SignatureContext);
}
