const express = require('express');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());

const getAllCustomers = require('./handlers/getAllCustomers');
const registerCustomer = require('./handlers/registerCustomer');
const signinCustomer = require('./handlers/signinCustomer');
const detailsOfCustomer = require('./handlers/detailsOfCustomer');
const createCard = require('./handlers/createCard');
const getAllCards = require('./handlers/getAllCards');
const getMyCards = require('./handlers/getMyCards');
const authenticateCustomer = require('./middlewares/authenticateCustomer');
const getMyCardByUserAndCardId = require('./handlers/getMyCardByUserAndCardId');
const deleteCard = require('./handlers/deleteCard');
const updateCard = require('./handlers/updateCard');
const getCardsByCustomerId = require('./handlers/getCardsById');
const getAllCustomersIdAndNames = require('./handlers/getAllCustomersIdAndNames');
const detailsOfOneCustomer = require('./handlers/getTheDetailsOfOneCustomerById');

server.get('/customers', authenticateCustomer, getAllCustomers);
server.get('/customers/getmydetails', authenticateCustomer, detailsOfCustomer);
server.get('/customers/getCustomersIdAndName', authenticateCustomer, getAllCustomersIdAndNames)
server.get('/customers/getCustomersDetails', authenticateCustomer, detailsOfOneCustomer)
server.post('/customers/register', registerCustomer);
server.post('/customers/signin', signinCustomer);

server.get('/cards/getcardsbyuserid', authenticateCustomer, getCardsByCustomerId)
server.get('/cards', authenticateCustomer, getAllCards);
server.get('/cards/getmycards', authenticateCustomer, getMyCards);
server.get('/cards/getmycardbyid', authenticateCustomer, getMyCardByUserAndCardId);
server.post('/cards/create', authenticateCustomer, createCard);
server.delete('/cards/deleteone', authenticateCustomer, deleteCard);
server.put('/cards/updatecard', authenticateCustomer, updateCard);

server.listen(3000, () => console.log('Express listening'));

