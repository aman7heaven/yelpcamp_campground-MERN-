if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const ExpressError = require('./utils/ExpressError');
const userRoutes=require('./routes/users.js');
const campgroundRoutes=require('./routes/campgrounds.js');
const reviewRoutes=require('./routes/reviews.js');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js')
const mongoSanitize=require('express-mongo-sanitize');
const MongoDBStore=require('connect-mongo')(session);




mongoose.connect(`mongodb+srv://aman7heaven:${process.env.SECRET}learn.v9ypdak.mongodb.net/?retryWrites=true&w=majority`);

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database entered");
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(mongoSanitize());

const secret=process.env.SECRET || "thisshouldbeasecret!";

const store=new MongoDBStore({
    url:`mongodb+srv://aman7heaven:${process.env.SECRET}learn.v9ypdak.mongodb.net/?retryWrites=true&w=majority`,
    secret,
    touchAfter: 24*3600
})

store.on("error",function(e){
    console.log("session store error",e);
})

const sessionConfig={
    store,
    name:'session',
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires: Date.now()+ 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }

}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
   res.locals.currentUser=req.user;
   res.locals.success=req.flash('success');
   res.locals.error=req.flash('error');
   next(); 
})



app.get('/',(req,res)=>{
    res.render('home.ejs');
})

app.use('/',userRoutes);

app.use('/campgrounds',campgroundRoutes);

app.use('/campgrounds/:id/reviews',reviewRoutes);

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found', 404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500,message='something went wrong'}=err;
    if(!err.message)err.message='oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs',{err});
   // res.send('oh boy, something went wrong');
})

const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`serving on port ${port}`);
})