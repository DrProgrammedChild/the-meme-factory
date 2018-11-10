//Made by the meme factory

//Variables
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

//Functions
function random(min,max){
	return Math.floor(Math.random() * (max-min+1)) + min;
}

function getMeme(deepfried){
	return new Promise((resolve,reject) => {
		let url;
		if(deepfried){
			url = "https://www.reddit.com/r/DeepFriedMemes/new.json?sort=new";
		} else{
			url = "https://www.reddit.com/r/dankmemes/new.json?sort=new";
		}
		request(url,(err,res,body) => {
			let json = JSON.parse(body);
			let posts = json.data.children;
			let post = posts[random(0,posts.length)];
			while(post == undefined){
				post = posts[random(0,posts.length)];
			}
			resolve({
				text: post.data.title,
				image: post.data.url
			});
		});
	});
}

//Express routes
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static("client"));

app.get("/",(req,res) => {
	res.sendFile("./client/index.html");
});

app.post("/getmeme",urlencodedParser,(req,res) => {
	let deepfried;
	if(req.body.deepfried == "true"){
		deepfried = true;
	} else{
		deepfried = false;
	}
	getMeme(deepfried)
		.then(meme => {
			res.end(JSON.stringify(meme));
		})
		.catch(console.log);
});

//Listen
app.listen(process.env.PORT || 8081);
console.log("Listening on port " + (process.env.PORT || 8081));