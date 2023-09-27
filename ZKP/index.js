const circomlib = require('circomlibjs')

const encode = (message) => {
    let str='';
  for (let i = 0; i < message.length; i++) {
    const charCode = message.charCodeAt(i);
    str+=charCode.toString()
  }
  return BigInt(str)
}

const main = async () => {
    const poseidon = await circomlib.buildPoseidon()
    const message = encode("Endocarditis")
    console.log('message', message)
    const hash = poseidon([message])
    console.log('hass', poseidon.F.toString(hash))
}

main()