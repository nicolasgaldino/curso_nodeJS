import chalk from 'chalk';
import Sequelize from 'sequelize';
const sequelize = new Sequelize("nodemvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log(chalk.green("Conectado ao MySQL."));
} catch (error) {
  console.log(chalk.red(`Não foi possível conectar: ${error}.`));
}

export default sequelize;
