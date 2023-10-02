const express = require("express")
const cors = require("cors")
const snarkjs = require("snarkjs")

const encode = (message) => {
  let str = '';

  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    str += charCode.toString()
  }

  return {
    disease: BigInt(str)
  }
}

const argify = (callData) => {
  const argv = callData
  .replace(/["[\]\s]/g, "").split(",")

const a = [argv[0], argv[1]];
const b = [
  [argv[2], argv[3]],
  [argv[4], argv[5]],
];
const c = [argv[6], argv[7]];
const d = [argv[8]];

return [a, b, c, d]
}

const app = express()
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('./ageVerification'))
app.use(express.static('./PxVerification'))
app.use(express.static('./reportVerification'))
app.listen(8000, () => {
  console.log("Listening on port 8000")
})

app.post("/generateProof/age", async (req, res) => {
  try {
    const signals = req.body
    const wasmFile = "./ageVerification/age_js/age.wasm"
    const zkeyFile = "./ageVerification/age_final.zkey"

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(signals, wasmFile, zkeyFile)
    let callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    callData = argify(callData)
    res.send(callData)
  }
  catch (err) {
    console.log(err)
  }
})

app.post("/generateProof/px", async (req, res) => {
  try {
    const signals = req.body
    const wasmFile = "./PxVerification/validPrescription_js/validPrescription.wasm"
    const zkeyFile = "./PxVerification/validpx_0001.zkey"

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(signals, wasmFile, zkeyFile)
    let callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    callData = argify(callData)
    res.send(callData)
  }
  catch (err) {
    console.log(err)
  }
})

app.post("/generateProof/report", async (req, res) => {
  try {
    let signals = req.body
    signals = encode(signals.disease)
    const wasmFile = "./reportVerification/report_js/report.wasm"
    const zkeyFile = "./reportVerification/report_final.zkey"

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(signals, wasmFile, zkeyFile)
    let callData = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    callData = argify(callData)
    res.send(callData)
  }
  catch (err) {
    console.log(err)
  }
})


// const circomlib = require('circomlibjs')

// const main = async () => {
//     const poseidon = await circomlib.buildPoseidon()
//     const message = encode("Endocarditis")
//     console.log('message', message)
//     const hash = poseidon([message])
//     console.log('hass', poseidon.F.toString(hash))
// }

// main()