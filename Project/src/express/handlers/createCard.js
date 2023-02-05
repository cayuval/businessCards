const validateCreateCard = require('../../joi/validateCreateCard');
const operations = require('../../mongoose/cardOperations');

async function createCard(req, response) {

    const result = validateCreateCard(req.body);
    if (result.error)
        return response.status(400).json(result.error.details[0].message);

    req.body.userId = req.userID;
    const cardFromDB = await operations.createCardInMongoDB(req.body);

    if (cardFromDB == null) {
        return response.status(500)
            .json(`Error - Card wasn't saved in database`);
    }

    response.json(cardFromDB);

}


module.exports = createCard;