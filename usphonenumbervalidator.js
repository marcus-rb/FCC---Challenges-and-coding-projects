function telephoneCheck(str) {
  if (!/\d/.test(str[0])) {
    if (!/\(/.test(str[0])) return false;
  }
  //if it is 11 numbers long, 1 must be the first
  //if it has parenteses, they must enclose three characters, and those must be the first three
  str = str.split("");
  str = str.filter(item => !/\-|\s/.test(item));

  //All non-paranthesis characters that are legal are now filtered out

  console.log(str);

  let backup = [...str];

  str = str.filter(item => !/\(|\)/.test(item));

  str = str.join(""); console.log(str);
   
  if (/\D/.test(str)) return false;
  if (str[0] == 1) {
    if (str.length != 11) return false;
  } else if (str.length != 10) return false;

  console.log(str);

  //backup = backup.join(""); console.log(backup);

  let regex1 = /1\(\d\d\d\)/;
  let regex2 = /^(\(\d\d\d\))/;

  if (/\(/.test(backup) || /\)/.test(backup)) {
    backup = backup.join(""); console.log(backup);
    if (regex1.test(backup)) {
      console.log("hello");
      return true;
    } else if (regex2.test(backup)) {
      console.log("oi");
      return true;
    } else {
      return false;
    }
  }

  // Good luck!
  return true;
}

telephoneCheck("1(555)-555-5555");
