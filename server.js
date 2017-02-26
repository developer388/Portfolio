var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var email   = require("emailjs/email");
var app = express();

app.use(express.static(__dirname+'/public',{redirect:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server  = email.server.connect({
   user:     "nickhil388@gmx.com", 
   password: new Buffer("Y291bnRlci1zdHJpa2U=",'base64').toString('ascii'), 
   host:     "mail.gmx.com", 
   ssl:      false,
   port :587

});

app.post('/sendmsg', function(req, res){
	server.send({
	   text:    "Sender Name : "+req.body.name+"\n\nSender Email : "+req.body.email+"\n\nSubject : "+req.body.subject+"\n\nMessage : "+req.body.message, 
	   from:    "Message <nickhil388@gmx.com>", 
	   to:      "Nikhil Gautam <nickhil388@gmail.com>",
	   subject: req.body.subject+" (Portfolio Message)"
	}, function(err, message){
		if(!err){
		  res.json({success:true}); 
		}
		else{
		  res.json({success:false, error:err});
		}

	});
});

app.get('/ping', function(req, res){
        console.log("Ping : " + new Date()); 
	res.json({message : 'Portfolio - Nikhil Gautam'});  
});

app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/public/404Files/404.html');    
});

var port = process.env.PORT || 8080;
app.listen(port,function(){
	console.log("Server Started, Port : "+port);
});


