const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'p1',
    message: 'Por favor, informe seu nome.',
  },
  {
    name: 'p2',
    message: 'Por favor, informe sua idade.',
  },
]).then((respostas) => {
  try {
    console.log(chalk.bgYellow.black(`Olá ${respostas.p1}, pelo visto você tem ${respostas.p2} anos. Que legal.`));
  } catch(err) {
    console.log(err);
  };
});
