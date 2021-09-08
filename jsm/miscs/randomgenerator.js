var initstate=[102,108,97,103,123,77,105,110,51,99,114,97,102,116,95,87,105,84,104,95,49,102,115,114,72,97,99,107,69,82,71,65,77,51,95,50,48,50,108,125];
var C_d=[1,1,1,0,0];
function LFSR(C,registers){
    let L=initstate.length;
    if(C.length!= (L+1)) return -1;
    if (C[0]!=1) return -1;
    let result=registers[L-1];//last register
    let newbit=0;
    for (let i=0;i<L;i++){
        if(C[i+1]!=0) newbit^=registers[i];
    }
    for (let i=L-1;i>0;i--) registers[i]=registers[i-1];
    registers[0]=newbit;
    console.log(registers);
    return  result;
}