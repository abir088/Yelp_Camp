var express   = require("express"),
 app          = express(),
 bodyParser   = require("body-parser"),
 mongoose     = require("mongoose"),
 flash        = require("connect-flash"),
 Campground   = require("./models/campground"),
 Comment      = require("./models/comment"),
 passport     = require("passport"),
 LocalStrategy= require("passport-local"),
 seedDB       = require("./seeds"),
methodOverride = require("method-override"),
 User         = require("./models/user");
 mongoose.Promise = global.Promise

 
 var commentRoutes     = require("./routes/comments"),
     campgroundRoutes  = require("./routes/campgrounds"),
     indexRoutes        = require("./routes/index");

//mongoose.connect("mongodb://localhost/v10", {useMongoClient: true});
mongoose.connect("mongodb://abir:abirnu@ds111618.mlab.com:11618/yelpcamp_abir");
//seedDB(); 
//var request = require("request");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Nusrat is best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

//ROUTES
app.use(indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);
   
//NEW - show form to create a new campground
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp Server Has Started!!!");
})

