// Follow the docs to create SMTP server :- https://www.nodemailer.com/extras/smtp-server/

const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    allowHalfOpen: true,

    onConnect(session, cb){
        console.log("onConnect", session.id);
        // cb(new Error);  --> If want to reject the connection 
        cb()  // Accept the connection
    },

    onMailFrom(address, session, cb){
        console.log("onMailFrom", address.address, session.id);  // address.address --> Means mail comes from which email address
        cb()
    },

    onRcptTo(address, session, cb){
        console.log("onRcptTo", address.address, session.id);  // address.address --> Means mail comes from which email address
        cb()
    },

    onData(stream, session, cb){
        stream.on("data", (data) => console.log(`onData : ${data.toString()}`));
        stream.on("end", cb);
    }
});


server.listen(25, () => {
    console.log("SMTP Server is running on port : 25");
})