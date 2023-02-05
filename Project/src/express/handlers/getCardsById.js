const cardOperations = require('../../mongoose/cardOperations')
async function getCardsByCustomerId(req, res) {
    const customerId = req.query.customerId
    if (!customerId) {
        return res.status(400).json('no customer id supplied')
    }
    const userCards = await cardOperations.getCardsByUserId(customerId)
    res.status(200).json(userCards);
}

module.exports = getCardsByCustomerId