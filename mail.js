var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
app.listen(3000);
console.log("Server running on port 3000");
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Yahoo",
    auth: {
        user: "arunraj607@yahoo.com",
        pass: "9159476100baluAISH"
    }
});

var mail = {
    from: "arunbalu487@gmail.com",
    to: "arunbalu79@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    
    smtpTransport.close();
});
