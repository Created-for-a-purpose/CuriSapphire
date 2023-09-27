pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template minAge(){
    signal input age;
    signal output isOlder;
    
    component gte = GreaterEqThan(45);
    gte.in[0] <== age; 
    gte.in[1] <== 18;

    gte.out === 1;
    isOlder <== gte.out;
}

component main = minAge();