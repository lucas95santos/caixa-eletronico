// manipulação do saque

function handleWithdraw(value) {
  const parsedValue = parseInt(value);
  const valueIsValid = parsedValue >= 1 && parsedValue <= 1000;
  const isBillNotExist = parsedValue === 3 || parsedValue === 1;

  if (!valueIsValid) {
    withdrawLimitError(parsedValue);
    return;
  }

  if (isBillNotExist) {
    withdrawBillNotExistError();
    return;
  }

  const usedBills = withdraw(parsedValue);

  if (usedBills) {
    const response = withdrawResponse(usedBills);

    console.log('------------------------------');
    console.log('Saque realizado com sucesso!');
    console.log(response);
  }
}

// lógica do saque

function withdraw(value) {
  const bills = { 200: 0, 100: 0, 50: 0, 20: 0, 10: 0, 5: 0, 2: 0 };
  const billsKeys = Object.keys(bills).reverse().map(key => parseInt(key));

  let index = 0;

  while (value > 0 && index < billsKeys.length) {
    if (value === 3 || value === 1) {
      bills[billsKeys[--index]] -= 1;
      value += billsKeys[index];
      index++;
    } else if (value === 6 || value === 8) {
      index = billsKeys.length - 1;
    }

    bills[billsKeys[index]] = parseInt(value / billsKeys[index]);
    value %= billsKeys[index];

    index++;
  }

  return bills;
}

// repostas

function withdrawResponse(bills) {
  return 'Notas entregues: ' +
    `${bills[200]} nota(s) de R$200,00, ` +
    `${bills[100]} nota(s) de R$100,00, ` +
    `${bills[50]} nota(s) de R$50,00, ` +
    `${bills[20]} nota(s) de R$20,00, ` +
    `${bills[10]} nota(s) de R$10,00, ` +
    `${bills[5]} nota(s) de R$5,00 e ` +
    `${bills[2]} nota(s) de R$2,00.`;
}

function withdrawLimitError(value) {
  console.log('------------------------------');
  console.log('Erro ao realizar o saque:');

  if (value > 1000) {
    console.log('O valor do saque supera o limite de R$1000,00.');
  } else {
    console.log('O valor do saque é insuficiente.');
  }
}

function withdrawBillNotExistError() {
  console.log('---------------------------');
  console.log('Erro ao realizar o saque:');
  console.log('Não é possível realizar o saque pois não há notas de R$1,00.');
}

// leitura da entrada

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question('Informe o valor do saque: ', (value) => {
  handleWithdraw(value);

  reader.close();
});
