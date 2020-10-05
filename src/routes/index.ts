import express from "express";
var router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

export default router;
