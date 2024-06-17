var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller')
var authCtrl = require('../controllers/auth.controller')

/* GET users listing. */
router
  .get('/:_id',     
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userController.delete)
  .delete('/:_id',
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    userController.delete
  )

router
  .get('/', userController.find)
  .post('/', userController.save);

router.get("/hello",
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  userController.hello)



module.exports = router;
