const identifier = require('./Identifier');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId : 'us-east-1_UoI3WNk7Z', // Your user pool id here
    ClientId : '10u18f68jmfc8cou3lej3k5rkf' // Your client id here
};

const pool_region = 'us-east-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();

module.exports = api;

api.get('/hello', () => {
  return 'hello world';
});

api.get('/v1/current', () => {
  let counter = identifier.counter;
  return 'Current : ' + counter;
});

api.get('/v1/next', () => {
  let counter = identifier.increment();
  return 'Next : ' + counter;
});

api.get('/v1/reset', () => {
  let resetVal = parseInt(req.current);
  identifier.counter = resetVal;  
  return 'Reset' + resetVal;
});
 
api.get('/signup', (req, res) => {
    var attributeList = [];
attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:"rockycool000007@gmail.com"}));

userPool.signUp('rockycool000007@gmail.com', 'Password123', attributeList, null, function(err, result){
    if (err) {
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log(cognitoUser);
    console.log('user name is ' + cognitoUser.getUsername());
});
});


api.get('/signin', (req, res) => {
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username : 'rockycool000007@gmail.com',
    Password : 'Password123',
});

var userData = {
    Username : 'rockycool000007@gmail.com',
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        console.log('id token + ' + result.getIdToken().getJwtToken());
        console.log('refresh token + ' + result.getRefreshToken().getToken());
    },
    onFailure: function(err) {
        console.log(err);
    },
});
});
