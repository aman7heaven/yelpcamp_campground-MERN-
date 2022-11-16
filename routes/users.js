const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const User=require('../models/user.js');
const passport = require('passport');
const users=require('../controllers/users.js');

router.route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register))

router.route('/login')
   .get(users.renderLogin)
   .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login)

// router.get('/logout', function(req, res, next){
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       req.flash('success','Goodbye!');
//       //res.redirect('/campgrounds');
//     });
//   });

router.get('/logout', users.logout);



module.exports=router;
