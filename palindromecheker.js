function palindrome(str) {
  str = str.toLowerCase();
  str = str.split("");

  let htmlChars = /&(nbsp|amp|quot|lt|gt);/;
  let normalChars = /\w/;

  str = str.filter( item => {
    if (htmlChars.test(item) == true || normalChars.test(item) == true) {
      if (!/\_/.test(item)) {
        return true;
      } else {
        return false;
      }
    }
  })
  
  let normal = [...str];
  str.reverse();

  console.log(normal);
  console.log(str);

  console.log(normal == str);
  let boolArr = [];

  for (let index in str) {
    if (str[index] == normal[index]) {
      boolArr.push(true);
    } else {
      boolArr.push(false);
    }
  }
  console.log(boolArr);

  console.log(boolArr.indexOf(false) == -1);

  return boolArr.indexOf(false) == -1;
}



palindrome("My age is 0, 0 si ega ym.");
