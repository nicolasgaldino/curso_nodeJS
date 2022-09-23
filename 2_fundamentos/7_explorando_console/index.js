const x = 10;
const y = 'Nícolas';
const z = [1, 2];

console.log(x, y, z)

// contagem de impressões
console.count(`O valor de X é: ${x}, contagem.`)
console.count(`O valor de X é: ${x}, contagem.`)
console.count(`O valor de X é: ${x}, contagem.`)

// variáveis entre string
console.log('O nome é %s, e ele é programador', y)

// limpar console
const limpaConsole = setTimeout(() => {
  console.clear();
}, 1000);
