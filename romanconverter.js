function convertToRoman(num) {

    let index = 0;
    let ans = "";
    let romanArr = ["M","CM","D","LD","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let corrArr = [1000,900,500,450,400,100,90,50,40,10,9,5,4,1];

    function converter() {
        while (index < romanArr.length) {
            if (num - corrArr[index] >= 0) {
                ans+=romanArr[index];
                num-=corrArr[index];
                converter();
            } else {
                index++;
                converter();
            }
        }
    }
    converter();

 return ans;
}

convertToRoman(99);
