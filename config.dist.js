var config = {};

config.gmailUsername = 'yourname@gmail.com';
config.gmailPassword = 'yourpassword';
config.twilioFromNumber = '+15555555555'; // Valid twilio number to send from
config.twilioToNumber = '+15555555555'; // Twilio authorized number to SMS
config.twilioAccountSid = '...'; // Your Account SID from www.twilio.com/console
config.twilioAuthToken = '...'; // Your Auth Token from www.twilio.com/console

module.exports = config;