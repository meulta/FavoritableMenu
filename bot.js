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
    {
        "title" : "Menu m", 
        "submenu": [
           { "title": "Menu m - 1" },
           { "title": "Menu m - 2" },
           { "title": "Menu m - 3" }
        ]
    },
    { 
        "title" : "Menu e", 
        "submenu": [
           { "title": "Menu e - 1" },
           { "title": "Menu e - 2" },
           { "title": "Menu e - 3" }
        ]
    },
    { 
        "title" : "Menu u", 
        "submenu": [
           { "title": "Menu u - 1" },
           { "title": "Menu u - 2" },
           { "title": "Menu u - 3" }
        ]
    },
    { 
        "title" : "Menu l", 
        "submenu": [
           { "title": "Menu l - 1" },
           { "title": "Menu l - 2" },
           { "title": "Menu l - 3" }
        ]
    },
    { 
        "title" : "Menu t", 
        "submenu": [
           { "title": "Menu t - 1" },
           { "title": "Menu t - 2" },
           { "title": "Menu t - 3" }
        ]
    },
    { 
        "title" : "Menu a", 
        "submenu": [
           { "title": "Menu a - 1" },
           { "title": "Menu a - 2" },
           { "title": "Menu a - 3" }
        ]
    }    
];

bot.dialog('/', 
    function (session) {
        session.beginDialog("/menu");
    }
);

bot.dialog('/menu', 
    function (session, args) {
        var buttons = [];
        for(var menuid in menu){
            var menuItem = menu[menuid];
            buttons.push(builder.CardAction.postBack(session, menuItem.title, menuItem.title));
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
    }
);
