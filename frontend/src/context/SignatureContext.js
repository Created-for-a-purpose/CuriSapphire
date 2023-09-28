import { createContext, useState } from "react";

const SignatureContext = createContext({
  signature: '',
  setSignature: () => {},
});

export function SignatureContextProvider({ children }) {
  const [signature, setSignature] = useState('');

  return (
    <SignatureContext.Provider value={{ signature, setSignature }}>
      {children}
    </SignatureContext.Provider>
  );
}

export default SignatureContext;
