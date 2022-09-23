const x = '10';

// x é número?
if(!Number.isInteger(x)) {
  throw new Error("O valor de x não é m número inteiro.");
};

console.log("Continuando o código.");
