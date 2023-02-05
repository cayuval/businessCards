const operations = require('../../mongoose/customerOperations');

async function detailsOfCustomer(req, res) {

        const customer = await operations.getCustomerDetailsById(req.userID);
        if (!customer) {
                return res.status(400).json('no customer found')
        }
        res.json({ name: customer.name, isBusinessAccount: customer.isBusinessAccount });
}
module.exports = detailsOfCustomer;