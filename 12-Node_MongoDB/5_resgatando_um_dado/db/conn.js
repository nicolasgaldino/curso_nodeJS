import chalk from "chalk";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/testemongodb";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log(chalk.bgGreen("Conectado ao MongoDB."));
  } catch (error) {
    console.log(chalk.bgRed(`Erro ao conectar no MongoDB: ${error}.`));
  };
};

run();

export default client;
