const customerOperations = require('../../mongoose/customerOperations')

async function getAllCustomersIdAndNames(req, res) {
    const result = await customerOperations.getAllCustomersIdAndName()
    res.json(result)
}

module.exports = getAllCustomersIdAndNames;