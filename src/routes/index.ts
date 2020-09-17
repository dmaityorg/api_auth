var express = require('express');
var router = express.Router();
const postController = require('../controllers').post;

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.render('index', { title: 'Express' });
});

router.get('/api/post', postController.list);
router.get('/api/post/:id', postController.getById);
//router.put('/api/profile/:id', profileController.update);
router.post('/api/post', postController.add);

module.exports = router;
