if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
//const connection=require('./database')
const bodyparser=require('body-parser')
const mysql=require('mysql')
const cors=require('cors')
const express=require('express');
const app=express();
const bycrypt=require('bcrypt')
const passport=require('passport')
const flash = require('express-flash');
const session=require('express-session');
const methodOverride=require('method-override');
const path=require('path')
//app.set("view-engine","ejs");
const localStrategy = require('passport-local').Strategy
const initializePassport=require('./passport');
initializePassport(passport,
    email =>
      users.find(user=>user.email===email),
      id =>users.find(user=>user.id===id))
const users=[]

app.use(flash())
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:false
}))
//app.set('view-engine','ejs')
app.use(express.static(path.join(__dirname,'views')))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended:false}))
const db=mysql.createConnection({
    host:'localhost',
 user:'root',
 password:'',
 database:"chedi",

})
app.post('/regester',async(req,res)=>{

    try{
const hashedpassword=await bycrypt.hash(req.body.password,10)
users.push({

  1: Date.now().toString(),
  2: req.body.name,
   3:req.body.number,
   4:req.body.email,
   5:hashedpassword,
})
console.log(users);

res.redirect("/login")
    }

    catch (erro){
        console.log(erro);
res.redirect('/regester')
    }
})

//routers *juma
app.get('/',(req,res)=>{
    res.render("index.ejs")

})
app.get('/login',(req,res)=>{
    res.render("login.ejs")

})
app.get('/terms',(req,res)=>{
    res.render("learn.ejs")
})
app.get('/about',(req,res)=>{
    res.render("about.ejs")
})

app.get('/regester',(req,res)=>{
    res.render("regester.ejs")

})
app.get('/jobs',(req,res)=>{
    res.render("jobs.ejs")
})
//end routers *juma
app.post('/login',passport.authenticate('local',{
successRedirect:'/',
failureRedirect:'login',
failureFlash:true
}))
app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
});



app.listen(5000,()=>{
    console.log('listening to port 5000..')

})

