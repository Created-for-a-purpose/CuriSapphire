pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

template reports() {
  //private
  signal input disease;
  //output 
  signal output out;
  
  component hasher = Poseidon(1);
  hasher.inputs[0] <== disease;
  
  // Disease family poseidon hashes
  signal family[6];
  family[0] <== 10138473559871995010307268226905425724681940360513062957295454069397599314525;
  family[1] <== 21376789709107593627145716348523760989608875118051263279881625969624014615883;
  family[2] <== 4430175886183661437656102239383593723795691624124200700497763890983535029953;
  family[3] <== 1330814963610105146365118159727714155225891388349253530931907400029782062805;
  family[4] <== 5160397270033164433725092405016928658736198365993123233790039891164769776912;
  family[5] <== 19621835075077924613181582855474497084870587109745717369921552628784982175925;
  
   var matchFound;
  
  // Check if hasher output matches any in the family
    component e1 = IsEqual();
    e1.in[0] <== hasher.out;
    e1.in[1] <== family[0];
    matchFound = e1.out;
    
    component e2 = IsEqual();
    e2.in[0] <== hasher.out;
    e2.in[1] <== family[1];
    matchFound = matchFound + e2.out;

    component e3 = IsEqual();
    e3.in[0] <== hasher.out;
    e3.in[1] <== family[2];
    matchFound = matchFound + e3.out;

    component e4 = IsEqual();
    e4.in[0] <== hasher.out;
    e4.in[1] <== family[3];
    matchFound = matchFound + e4.out;

    component e5 = IsEqual();
    e5.in[0] <== hasher.out;
    e5.in[1] <== family[4];
    matchFound = matchFound + e5.out;

    component e6 = IsEqual();
    e6.in[0] <== hasher.out;
    e6.in[1] <== family[5];
    matchFound = matchFound + e6.out;

    matchFound === 1;
    out <== matchFound;
}

component main = reports();