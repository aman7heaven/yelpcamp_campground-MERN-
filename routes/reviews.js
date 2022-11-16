const express=require('express');
const router=express.Router({mergeParams:true});
const reviews=require('../controllers/reviews.js');
const catchAsync=require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const{validateReview,isLoggedIn,isReviewAuthor}=require("../middleware");
const Campground=require('../models/campground.js');
const Review=require('../models/review');
const {reviewSchema}=require('../schemas.js');


router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview));
 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));

 module.exports=router;