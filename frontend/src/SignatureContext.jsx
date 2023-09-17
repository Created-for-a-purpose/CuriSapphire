import React, { createContext, useState, useMemo } from 'react';

const SignatureContext = createContext(
  {
    signature: "",
    updateSignature: (newSignature) => {}
  }
);

let x = 0;

export const SignatureProvider = ({children}) => {
  const [signature, setSignature] = useState('');

  const updateSignature = (newSignature) => {
    setSignature(newSignature);
  };

  const memoizedValue = useMemo(() => (
     {signature, updateSignature}
  ), [signature]);

  return (
    <SignatureContext.Provider value={memoizedValue}>
      {children}
    </SignatureContext.Provider>
  );
};

export default SignatureContext;
