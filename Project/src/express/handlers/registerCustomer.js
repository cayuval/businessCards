const operations = require('../../mongoose/customerOperations');
const validateRegisterCustomer = require('../../joi/validateRegisterCustomer');
async function registerCustomer(req, res) {
  const { error } = validateRegisterCustomer(req.body);
  if (error)
    return res.status(400).json(error.details[0].message);

  const retVal = await operations.registerCustomer(req.body);
  if (retVal == null)
    return res.status(404).json('customer wasnt added - email is probably already registred');
  res.status(200).json({ id: retVal._id, email: retVal.email });
}

module.exports = registerCustomer;