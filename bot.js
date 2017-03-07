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
// Helpers
//=========================================================

function createHeroCard(session, title, buttonNames) {
    var buttons = [];
    buttonNames.forEach(function (buttonName) {
        buttons.push(
            builder.CardAction
                .dialogAction(session, buttonName, null, "Intent " + buttonName)
        )
    })
    return new builder.HeroCard(session)
        .title(title)
        .buttons(buttons);
}

//=========================================================
// Bot Dialogs
//=========================================================

bot.dialog('/',
    function (session) {
        session.beginDialog("/topLevelMenu");
    }
);

bot.dialog('/topLevelMenu',
    function (session, args) {
        var buttons = [];
        var card = createHeroCard(session, "Top Level", ["A", "B", "C"]);

        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/A',
    function (session, args) {
        session.send("In Dialog A");
        var buttons = [];
        var card = createHeroCard(session, "Dialog A", ["A1", "A2", "A3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/B',
    function (session, args) {
        session.send("In Dialog A");
        var buttons = [];
        var card = createHeroCard(session, "Dialog B", ["B1", "B2", "B3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/C',
    function (session, args) {
        session.send("In Dialog A");
        var buttons = [];
        var card = createHeroCard(session, "Dialog C", ["C1", "C2", "C3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/A1',
    function (session) {
        session.endDialog("In dialog A1");
    });

bot.dialog('/A2',
    function (session) {
        session.endDialog("In dialog A2");
    });

bot.dialog('/A3',
    function (session) {
        session.endDialog("In dialog A3");
    });

bot.dialog('/B1',
    function (session) {
        session.endDialog("In dialog B1");
    });

bot.dialog('/B2',
    function (session) {
        session.endDialog("In dialog B2");
    });

bot.dialog('/B3',
    function (session) {
        session.endDialog("In dialog B3");
    });

bot.dialog('/C1',
    function (session) {
        session.endDialog("In dialog C1");
    });

bot.dialog('/C2',
    function (session) {
        session.endDialog("In dialog C2");
    });

bot.dialog('/C3',
    function (session) {
        session.endDialog("In dialog C3");
    });

// No 'matches' option means that these actions can only be triggered by buttons
bot.beginDialogAction('A', '/A');
bot.beginDialogAction('A1', '/A1');
bot.beginDialogAction('A2', '/A2');
bot.beginDialogAction('A3', '/A3');

bot.beginDialogAction('B', '/B');
bot.beginDialogAction('B1', '/B1');
bot.beginDialogAction('B2', '/B2');
bot.beginDialogAction('B3', '/B3');

bot.beginDialogAction('C', '/C');
bot.beginDialogAction('C1', '/C1');
bot.beginDialogAction('C2', '/C2');
bot.beginDialogAction('C3', '/C3');


