var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');

var app = express();

mongoose.connect(new Buffer('bW9uZ29kYjovL2FkbWluOmNvdW50ZXItc3RyaWtlQGRzMTI3OTgzLm1sYWIuY29tOjI3OTgzL3BvcnRmb2xpb25pY2toaWwzODg=','base64').toString('ascii'));
var message = mongoose.model('messages', mongoose.Schema({name:{type:String},email:{type:String},subject:{type:String},message:{type:String},time:{type:String}}));

app.use(express.static(__dirname+'/public',{redirect:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendmsg', function(req, res){
	var msg = new message({'name':req.body.name,'email':req.body.email,'subject':req.body.subject,'message': req.body.message,'time':moment().format('DD/MM/YYYY, hh:mm:ss A')});
	msg.save(function(err){
		if(err)
			res.json({success:false,error:err});
		else
			res.json({success:true});
	})
});

app.get('/messages',function(req,res){
	message.find({},{'_id':0,'password':0,'__v':0}, function(err,result){			
	    if(err)
	    	res.json({success:false,error:err})
	    else
	    	res.json({success:true,data:result});
	});
})

app.get('/resume', function(req,res){
 res.sendFile(__dirname+'/public/files/NIKHIL_GAUTAM_Resume.pdf');
});


app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/public/404Files/404.html');    
});

var port = process.env.PORT || 8080;
app.listen(port,function(){
	console.log("Server Started, Port : "+port);
});
