var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var menu = [
    "Menu m",
    "Menu e",
    "Menu u",
    "Menu l",
    "Menu t",
    "Menu a"
];

bot.dialog('/', function (session) {
    session.beginDialog("/menu");
});

bot.dialog('/menu', function (session) {
    var buttons = [];
    for(var menuid in menu){
        buttons.push(builder.CardAction.postBack(session, menu[menuid], menu[menuid]))
    }

    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("Menu")
                    .subtitle("Choose your option")
                    .buttons(buttons)
            ]);

    session.send(msg);
});