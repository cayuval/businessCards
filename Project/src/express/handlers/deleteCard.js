const operations = require('../../mongoose/cardOperations');


async function deleteCard(req, res) {
       const cardid = req.query.cardid;
       if (cardid) {
              const retVal = await operations.deleteOneCard(cardid, req.userID);
              if (retVal != null)
                     return res.json('deleted card');
       }
       res.status(500).json(`Card wasn't deleted`);
}

module.exports = deleteCard;