const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const CatfoodController = require('./controllers/CatfoodController');

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/catfood', CatfoodController.create);
    app.put('/catfood/:catfoodId', CatfoodController.put);
    app.delete('/catfood/:catfoodId', CatfoodController.remove);
    app.get('/catfood/:catfoodId', CatfoodController.show);
    app.get('/catfoods', CatfoodController.index);
}