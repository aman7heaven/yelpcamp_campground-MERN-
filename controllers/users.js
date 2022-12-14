const User=require('../models/user.js');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register.ejs'); 
}

module.exports.register=async(req,res,next)=>{
    try{
    const {email,username,password}=req.body;
    const user=new User({email,username});
    const registeredUser=await User.register(user,password);
    req.login(registeredUser,err=>{

        if(err) return next(err);
        req.flash('success','Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    })

    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
  
}

module.exports.renderLogin=(req,res)=>{
    res.render('users/login.ejs');
}

module.exports.login=(req,res)=>{
      
    req.flash('success','welcome back!');
    const redirecturl=req.session.returnTo || '/campgrounds';
    //delete req.session.returnTo;
    res.redirect(redirecturl);

}

module.exports.logout=function async(req, res, next) {
    req.logout();
    req.flash('success','Goodbye!');
    res.redirect('/campgrounds');
  }