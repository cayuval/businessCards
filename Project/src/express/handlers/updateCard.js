const validateCard = require('../../joi/validateCreateCard');
const operations = require('../../mongoose/cardOperations');
async function updateCard(req, res) {



    const cardID = req.query.cardid;
    const userID = req.userID;
    if (!cardID) {
        return res.status(400).json('לא סופק מזהה כרטיסיה');
    }
    //פניה לשכבת בסיס נתונים
    const result = await operations.updateOneCard(cardID, userID, req.body);
    if (result != null)
        return res.json(result);
    return res.status(500).json('  ERROR - Wasnt updated ');
}

module.exports = updateCard;