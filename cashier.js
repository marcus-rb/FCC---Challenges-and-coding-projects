function checkCashRegister(price, cash, cid) {
  //Using cents as base unit for currency, as JS has issues with floating points
  const urgay = [].concat(...cid);
  console.log(urgay);
  
  cash*=100;
  price*=100;

  var change = cash - price;
  let backup = change / 100;
  cid = cid.reverse();
  let totalChange = cid.map(item => item[1]).reduce((a,b) => a+b);

  let names = cid.map(item => item[0]);
  let vals = [10000,2000,1000,500,100,25,10,5,1];

  for (let item of cid) {
    item[1]*=100;
  }

  let index = 0;
  let result = [];
  let pay = ["",0];

  function returner() {
    while (index < names.length) {
      if (change >= vals[index]) {
        if (cid[index][1] >= vals[index]) {
          pay[0] = cid[index][0];
          pay[1] += vals[index];
          cid[index][1] -= vals[index];
          change -= vals[index];
          returner();
        } else {
          result.push(pay);
          pay = ["", 0];
          index++;
          returner();
        }
      } else {
        result.push(pay);
        pay = ["", 0];
        index++;
        returner();
      } 
    }
  }

  returner();

  result = result.filter(item => item.indexOf(0) == -1);

  for (let item of result) {
    item[1]/=100;
  }
  console.log(result);

  let state = {
    status: "OPEN",
    change: result
  }

  let returnedChange = result.map(item => item[1]).reduce((a,b) => a+b);

  if (change > returnedChange) {
    state.status = "INSUFFICIENT_FUNDS",
    state.change = [];
  }
  
  if (backup == totalChange) {
    state.status = "CLOSED";
    let newArr = [];
    for (let i = 0; i <urgay.length; i+=2) {
      newArr.push([urgay[i],urgay[i+1]]);
    }
    state.change = newArr;
  }
  console.log(state);
  // Here is your change, ma'am.
  return state;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
