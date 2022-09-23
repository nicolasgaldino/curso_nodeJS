const chalk = require('chalk');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Qual a sua linguagem favorita? ', (linguagem) => {
  const resposta = linguagem.toLowerCase();
  resposta == 'javascript' ? console.log(chalk.green(`Legal, eu também amo ${resposta}`)) : console.log(chalk.red(`${resposta} é uma linguagem meio merda, mas tudo bem.`));
  readline.close();
});
