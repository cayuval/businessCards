const { response } = require('express');
const cardOperations = require('../../mongoose/cardOperations');

async function getMyCardByUserAndCardId(req, res) {
    const cardId = req.query.cardId;
    if (!cardId)
        return res.status(400).json('insert card id');
    const card = await cardOperations.getOneCardbyUserIDAndCardID(req.userID, req.query.cardId);
    if (card == null) {
        return res.status(404).json('something went wrong...')
    }
    res.json(card);
}

module.exports = getMyCardByUserAndCardId;
