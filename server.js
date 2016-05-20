var express = require('express');
var app = express();
var mongojs= require('mongojs');
var nodemailer = require("nodemailer");
var db = mongojs('crudapp',['crudapp']);
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/crud',function(req, res){
console.log("I received a GET request")
db.crudapp.find(function (err, docs){
//console.log(docs);
res.json(docs);
});
});

app.put('/crud/:email', function(req, res){
var email=req.params.email;
var pass=req.body.password;
var val;
var msg;
console.log(pass);
console.log(email);
db.crudapp.findOne({email: email,password: pass}, function(err, doc) {
  if( err || !doc ) {msg="error";console.log(msg);
  }
  else {msg='success';console.log(msg);
  res.json(doc);
 }
});
});

app.delete('/crud/:id',function(req, res){
var id=req.params.id;
console.log(id);
db.crudapp.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
	res.json(doc);
});
});

app.post('/crud', function(req, res){
console.log("I received a POST request");
console.log(req.body);
var ename=req.body.email;
var ads=req.body.address;
 /* var smtpTransport = nodemailer.createTransport("SMTP",{
             host: "smtp.mail.yahoo.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
            auth: {
                 user: "arunraj607@yahoo.com",
                 pass: "9159476100baluAISH"
            }
        });
        var mailOptions = {
            from: "arunraj607@yahoo.com", // sender address
            to: ename, // list of receivers
            subject: "ABR", // Subject line
            //text: "Hello world ✔", // plaintext body
            html: "<b>"+ads+"</b>" // html body									
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email has been sent successfully");
        } 
    });*/

db.crudapp.insert(req.body, function(err, doc){
  res.json(doc);
})
});

app.post('/crud/:id',function(req, res){
var id=req.params.id;
db.crudapp.findAndModify({query :{_id: mongojs.ObjectId(id)},
	update:{$set:{firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, age: req.body.age, mobileNumber: req.body.mobileNumber, address: req.body.address, pincode: req.body.pincode}},
new: true},function(err,doc){
res.json(doc);
});
});

app.get('/crud/:id',function(req, res){
var id=req.params.id;
console.log(id);
db.crudapp.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
	res.json(doc);
});
});
app.listen(3030);
console.log("Server running on port 3030");