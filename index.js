var config = require('./config');
var twilio = require('twilio');
var MailListener = require("mail-listener2");

var client = new twilio.RestClient(config.twilioAccountSid, config.twilioAuthToken, {});

var mailListener = new MailListener({
    username: config.gmailUsername,
    password: config.gmailPassword,
    host: "imap.gmail.com",
    port: 993, // imap port
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap,
    debug: console.log, // Or your custom function with only one incoming argument. Default: null
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "Emergency", // mailbox (Gmail label) to monitor (Case sensitive)
    searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start(); // start listening

mailListener.on("error", function(err){
    console.log(err);
});

mailListener.on("mail", function(mail){
    client.messages.create({
        body: mail.subject + ' ' + mail.text,
        to: config.twilioToNumber, // Text this number
        from: config.twilioFromNumber  // From a valid Twilio number
    }, function(err, message) {
        console.log(err, message);
    });
});
