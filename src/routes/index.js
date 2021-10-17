const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')

function initRoutes(app) {
    app.post('/user/login', userController.login)
    app.post('/user/register', userController.register)
    app.post('/user/comment/:id', userController.addComment)
    app.put('/user/comment/:id', userController.editComment)
    app.get('/news/today', newsController.getTodayNews)
    app.post('/news', newsController.addNews)
    app.put('/news', newsController.updateNews)
}

module.exports = initRoutes
