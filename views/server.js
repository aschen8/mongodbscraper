//req dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyparser = require("body-parser");


//set up our port to be either the host's designated port, or 3000
var PORT= process.env.PORT || 3000;

//Instantiate our express app
var app = express();

//set up an express router
var router = express.Router();

//designate public folder as static dictionary
app.use(express.static(_dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyparser in app
app.use(bodyparser.urlencoded({
	extended:false
}));

//have every request go through router middleware
app.use(router);

//if Deployed, use the deployed database. otherwise, use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our database
mongoose.connect(db, function(error) {
	//log any errors connecting with mongoose
	if (error) {
		console.log(error);
        }
    //if no errors, log success message
    else{
    	console.log("mongoose connection is successful");
    }
});

//listen to the port
app.listen(PORT, function() {
	console.log("listening on port:" + PORT);

});