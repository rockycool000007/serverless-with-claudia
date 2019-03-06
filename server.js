const identifier = require('./Identifier');

var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();

module.exports = api;

api.get('/v1/current', () => {
  let counter = identifier.counter;
  return 'Current : ' + counter;
});

api.get('/v1/next', () => {
  let counter = identifier.increment();
  return 'Next : ' + counter;
});

//api.put('/v1/current', (req,res) => {
//return 'test';
//  let resetVal = Number(req.body.current);
//  if(resetVal >= 0){
//    identifier.counter = resetVal;  
//    return 'Identifier updated successfully';
//  }
//  else {
//    return 'Identifier cannot be reset. Non negative intereger value required';
//  }
//});


api.put('/v1/current', function (request) {
  return new Promise(function (resolve, reject) {
    // some asynchronous operation
  }).then(() => ' was saved');
});
