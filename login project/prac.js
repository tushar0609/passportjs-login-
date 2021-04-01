if(process.env.NODE_ENV!=='production'){
      require('dotenv').config()
}

var express=require('express');
var app=express();
var path=require('path');
var passport=require('passport');
var new_user=require('./add_new_user_db');
const {connect,Student}=require('./mongo');
const flash=require('express-flash');
const session=require('express-session')
const initilizePassport=require('./passport-config');

initilizePassport(
      passport,
      async (email) => {
            const user=(await Student.findOne({email:email}));
            console.log("in the get element by email");
            console.log(user);
            return user;
      },
      async (id) => {
            const user=(await Student.findOne({_id:id}));
            console.log("in the get element by id");
            console.log(user);
            return user;
      });

//setting up static path
const static_path=path.join(__dirname,'./public');
app.use(express.static(static_path));

//
app.set('view engine','ejs')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
//
app.use(flash());
app.use(session({
      secret:process.env.SESSION_SECRET,
      resave:false,
      saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get("/",function (req,res) {
      res.render('signup.ejs');
})

app.get("/login",function (req,res) {
      res.render('login.ejs');
})

app.get("/main",function (req,res) {
      console.log("in tha main");
      res.render('main.ejs');
})

const check=function (req,res,next) {
      console.log("in the paasport");
      next();
}
app.post("/login",check,passport.authenticate('local',{
      successRedirect:'/main',
      failureRedirect:'/login',
      failureFlash:true
}))

app.post("/",new_user,function (req,res) {
      res.redirect('/login');
})

const start = function() {
      try {
            app.listen(5000, () => {
                  console.log('Hello! Server started');
                  console.log(`REST API on http://localhost:5000`);
            })
      } catch (e) {
            console.error(e);
      }
}
start();
connect()
      .then(() =>{
                  console.log("mongo is conected");
            })
      .catch((e)=>{
            console.error(e);
      })