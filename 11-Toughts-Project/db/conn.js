import chalk from 'chalk';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log(chalk.bgGreen("Conectado ao banco com sucesso!"));
} catch (error) {
  console.log(chalk.red(`Não foi possível se conectar: ${error}`));
};

export default sequelize;
