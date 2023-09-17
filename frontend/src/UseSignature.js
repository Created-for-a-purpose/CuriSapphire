import { useContext } from 'react';
import SignatureContext from './SignatureContext';

const useSignature = () => useContext(SignatureContext);

export default useSignature;