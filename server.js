var express = require('express');
var bodyParser = require('body-parser');
var email   = require("emailjs/email");
var app = express();

app.use(express.static(__dirname+'/public',{redirect:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server  = email.server.connect({
   user:     "maverics399@gmail.com", 
   password: new Buffer("Y291bnRlci1zdHJpa2U=",'base64').toString('ascii'), 
   host:     "smtp.gmail.com", 
   ssl:      true,
});

app.post('/sendmsg', function(req, res){
	server.send({
	   text:    "Sender Name : "+req.body.name+"\n\nSender Email : "+req.body.email+"\n\nSubject : "+req.body.subject+"\n\nMessage : "+req.body.message, 
	   from:    "Message <message@portfolio.com>", 
	   to:      "Nikhil Gautam <maverics399@gmail.com>",
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

var ipaddress = process.env.OPENSHIFT_NODEJS_IP||'127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(ipaddress, port,function(){
	console.log("Server Started, IP : "+ipaddress+", Port : "+port);
});
