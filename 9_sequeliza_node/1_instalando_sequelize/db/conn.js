import chalk from 'chalk';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("nodesequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log(chalk.bgGreen("Conexão bem sucedida."))
} catch (err) {
  console.log(chalk.bgRed(`Não foi possível conectar ao banco: ${err}`));
};

export default sequelize;
