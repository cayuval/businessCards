const operations = require('../../mongoose/customerOperations');
const validateSigninCustomer = require('../../joi/validateSigninCustomer');
const jsonwebtoken = require('jsonwebtoken');
async function signinCustomer(req, res) {
   const { error } = validateSigninCustomer(req.body);
   if (error)
      return res.status(400).json(error.details[0].message);
   const { email, password } = req.body;
   const retVal = await operations.signInCustomer(email, password);
   if (!retVal)
      return res.status(500).json('Customer wasnt found');
   const token = jsonwebtoken.sign({
      customerid: retVal._id,
      isBusinessAccount: retVal.isBusinessAccount
   }, 'mykey');
   return res.json(token);
}
module.exports = signinCustomer;