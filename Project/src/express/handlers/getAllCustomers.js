const operations = require('../../mongoose/customerOperations');

async function getAllCustomers (req,res){

    const all = await operations.getAllCustomers();
    res.json(all)
}

module.exports=getAllCustomers;