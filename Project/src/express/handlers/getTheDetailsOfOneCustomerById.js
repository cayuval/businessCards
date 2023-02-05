const { custom } = require('joi');
const customerOperations = require('../../mongoose/customerOperations')

async function detailsOfOneCustomer(req, res) {

    const customerId = req.query.customerId
    if (!customerId) {
        return res.status(400).json('no customer Id')
    }

    const customer = await customerOperations.getCustomerDetailsById(customerId);
    if (!customer) {
        return res.json('customer wasnt found')
    }
    res.json({ name: customer.name });
}
module.exports = detailsOfOneCustomer;