console.log(process.argv);

const args = process.argv.slice(2);

console.log(args);

const nome = args[0].split('=')[1];

const idade = args[1].split('=')[1];

const profissao = args[2].split('=')[1];

console.log(nome, idade, profissao)

console.log(`${nome} tem ${idade} anos e trabalha como ${profissao}.`)
