// módulos externos
const chalk = require('chalk');
const inquirer = require('inquirer');
// módulos internos
const fs = require('fs');

// criando a operação
const operation = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que você deseja fazer?",
      choices: [
        "Criar conta.",
        "Consultar saldo.",
        "Depositar.",
        "Sacar.",
        "Sair."
      ]
    },
  ])
    .then((choice) => {
      const action = choice['action'];
      switch (action) {
        case "Criar conta.":
          createAccount();
          break;
        case "Consultar saldo.":
          getAccountBalance();
          break;
        case "Depositar.":
          deposit();
          break;
        case "Sacar.":
          withDraw();;
          break;
        case "Sair.":
          console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
          process.exit();
          break;
      };
    })
    .catch((error) => console.log(error));
};

// criando uma conta
const createAccount = () => {
  console.log(chalk.bgGreen.black("Obrigado por escolher nosso banco."));
  console.log(chalk.green("Defina as opções da sua conta a seguir."));
  buildAccount();
};

// gerando uma conta
const buildAccount = () => {
  inquirer.prompt([
    {
      name: "accountName",
      message: "Por favor, digite um nome para sua conta: ",
    },
  ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      };
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta já existe, por favor escolha outro nome."));
        buildAccount();
        return;
      }
      fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (error) => {
        console.log(error)
      });
      console.log(chalk.green(`Parabéns, ${accountName}! Sua conta foi criada com sucesso.`));
      operation();
    })
    .catch((error) => { console.log(error) });
};

// adicionando valores a conta do usuário
const deposit = () => {
  inquirer.prompt([
    {
      name: "accountName",
      message: "Qual o nome da sua conta? ",
    },
  ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return deposit();
      }
      inquirer.prompt([
        {
          name: "amount",
          message: "Quanto você deseja depositar? ",
        },
      ])
        .then((value) => {
          const amountValue = value['amount'];
          addAmount(accountName, amountValue);
          operation();
        })
        .catch((error) => { console.log(error) });
    })
    .catch((error) => console.log(error));
};

// exibir valores da conta
const getAccountBalance = () => {
  inquirer.prompt([
    {
      name: "accountName",
      message: "Qua o nome da sua conta? "
    },
  ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      } else {
        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.black(`Olá, ${accountName}! O saldo da sua conta é R$${accountData.balance}`));
        operation();
      }
    })
    .catch((error) => { console.log(error) });
};

// realizando saque
const withDraw = () => {
  inquirer.prompt([
    {
      name: "accountName",
      message: "Qual o nome da conta? "
    },
  ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        return withDraw();
      } else {
        inquirer.prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar? ",
          },
        ]).then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
        })
          .catch((error) => { console.log(error) });
      }
    })
    .catch((error) => { console.log(error) });
};

// funções de apoio 

// verificando se a conta existe
const checkAccount = (accountName) => {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe, por favor tente novamente."));
    return false;
  }
  return true;
};

// adicionando valores
const addAmount = (accountName, amount) => {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black("Ocorreu um erro, por favor tente novamente."));
    return deposit();
  } else {
    accountData.balance = Number(amount) + Number(accountData.balance);
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData),
      (error) => { console.log(error) },
    );
    console.log(chalk.green(`Foi depositado o valor de R$${amount}, na conta de ${accountName}.`))
  }
};

// removendo valor da conta
const removeAmount = (accountName, amount) => {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black("Nenhum valor foi digitado, por favor verifique e tente novamente."));
    return withDraw();
  } else if (accountData.balance < amount) {
    console.log(chalk.bgRed.black(`O valor solicitado é maior que o valor de saldo disponível, por favor tente novamente. Saldo disponível: ${accountData.balance}`));
    return withDraw();
  } else {
    accountData.balance = Number(accountData.balance) - Number(amount);
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData),
      (error) => { console.log(error) },
    );
    console.log(chalk.green(`Saque no valor de R$${amount}. Valor disponível para novos saques: R${accountData.balance}`));
    operation();
  };
};

// selecionando conta
const getAccount = (accountName) => {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJson);
};

// funções de apoio

operation();
