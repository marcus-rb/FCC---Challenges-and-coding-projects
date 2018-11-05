function checkCashRegister(price, cash, cid) {
  let verificationCid = [].concat(...cid);
  const backupChange = cash-price;

  verificationCid = verificationCid.map((cur,index,arr) => [cur, arr[index+1]]).filter(item => typeof(item[0]) != "number"); //We now have a non-changing copy of cid. This is the beaty of ES6
  
  //JS has issues with floats, so everything from here-on gets multiplied with 100 and parsed to int

  const names = cid.map(item => item[0]).reverse();
  const values = [10000,2000,1000,500,100,25,10,5,1];
  price = parseInt(price*100); cash = parseInt(cash*100); 
  let change = parseInt(cash-price);
  for (let i of cid) i[1] = parseInt(i[1]*100);
  cid = cid.reverse();
  
  //______________________________________________________

  let index = 0; let pay = ["",0]; let result = []; //From here we decide what to give back to the customer, pay will be the amount of each note, result will be the total
  function changeReturner() {
    function operation() { result.push(pay); pay = ["",0]; index++; changeReturner() }; //To avoid duplicating code, I define a short method to be executed
    while (index < names.length) {
      if (change >= values[index]) {
        if (cid[index][1] >= values[index]) {
          pay[0] = names[index]; pay[1] += values[index]; 
          cid[index][1] -= values[index];
          change -= values[index];
          changeReturner();
        } else {operation()}
      } else {operation()}
    }
  }

  changeReturner();
  result = result.filter(item => item[1] != 0);
  for (let i of result) i[1] /= 100;
 
  let drawer = {
    status: "OPEN",
    change: result
  }

  if (backupChange > result.map(item => item[1]).reduce((a,b) => a+b)) { //First check if the total amount of cash returned by the changeReturner is less than required
    drawer.status = "INSUFFICIENT_FUNDS"; drawer.change = [];
  } else if (JSON.stringify(result) == JSON.stringify(verificationCid.filter(item => item[1] != 0))) { //Then check if it is equal, thus closing the drawer.
    drawer.status = "CLOSED"; drawer.change = verificationCid; //Here we finally get to use the cid-copy we defined in the beginning.
  }

  return drawer;
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
