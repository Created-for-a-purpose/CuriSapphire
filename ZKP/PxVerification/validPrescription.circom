pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template pxValid(){
    signal input pxage;
    signal output isValid;

    component le = LessEqThan(45);
    le.in[0] <== pxage; 
    le.in[1] <== 180;

    le.out === 1;
    isValid <== le.out;
}

component main = pxValid();