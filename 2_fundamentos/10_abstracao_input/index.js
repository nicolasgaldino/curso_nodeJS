const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'p1',
    message: 'Qual a primeira nota?',
  },
  {
    name: 'p2',
    message: 'Qual a segunda nota?',
  },
]).then((respostas) => {
  const media = (Number(respostas.p1) + Number(respostas.p2)) / 2;
  media >= 7 ? console.log(chalk.green(`Você obteve uma média de ${media}. Parabéns! Você foi aprovado!`)) : console.log(chalk.red(`Você obteve uma média de ${media}. Infelizmente você está reprovado.`));
}).catch(err => console.log(err));
