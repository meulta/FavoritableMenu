var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
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
// Bot Dialogs
//=========================================================

bot.dialog('/',
    session => {
        session.beginDialog("/topLevelMenu");
        session.beginDialog("/favoriteMenu");
    }
);

bot.dialog('/topLevelMenu',
    (session, args) => {
        var buttons = [];
        var card = createHeroCard(session, "Top Level", ["A", "B", "C"]);

        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/favoriteMenu',
    (session, args) => {
        var orderedMenu = getMenuOrderedByScoreDesc(session, 3);

        if (orderedMenu && orderedMenu.length > 0) {
            var buttons = [];
            orderedMenu.forEach(menu => {
                buttons.push(menu.actionname);
            });
            var card = createHeroCard(session, "Favorite actions", buttons);

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachments([card]);
            session.endDialog(msg);
        }
        else {
            session.endDialog();
        }
    }
)

bot.dialog('/A',
    (session, args) => {
        session.send("In Dialog A");
        setMenuScore(session, "A");
        var buttons = [];
        var card = createHeroCard(session, "Dialog A", ["A1", "A2", "A3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/B',
    (session, args) => {
        session.send("In Dialog A");
        setMenuScore(session, "B");
        var buttons = [];
        var card = createHeroCard(session, "Dialog B", ["B1", "B2", "B3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/C',
    (session, args) => {
        session.send("In Dialog A");
        setMenuScore(session, "C");
        var buttons = [];
        var card = createHeroCard(session, "Dialog C", ["C1", "C2", "C3"]);
        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([card]);
        session.endDialog(msg);
    }
);

bot.dialog('/A1',
    session => {
        session.endDialog("In dialog A1");
        setMenuScore(session, "A1");
    });

bot.dialog('/A2',
    session => {
        session.endDialog("In dialog A2");
        setMenuScore(session, "A2");
    });

bot.dialog('/A3',
    session => {
        session.endDialog("In dialog A3");
        setMenuScore(session, "A3");
    });

bot.dialog('/B1',
    session => {
        session.endDialog("In dialog B1");
        setMenuScore(session, "B1");
    });

bot.dialog('/B2',
    session => {
        session.endDialog("In dialog B2");
        setMenuScore(session, "B2");
    });

bot.dialog('/B3',
    session => {
        session.endDialog("In dialog B3");
        setMenuScore(session, "B3");
    });

bot.dialog('/C1',
    session => {
        session.endDialog("In dialog C1");
        setMenuScore(session, "C1");
    });

bot.dialog('/C2',
    session => {
        session.endDialog("In dialog C2");
        setMenuScore(session, "C2");
    });

bot.dialog('/C3',
    session => {
        session.endDialog("In dialog C3");
        setMenuScore(session, "C3");
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

// ==========================================
// Helpers
// ==========================================

var createHeroCard = (session, title, buttonNames) => {
    var buttons = [];
    buttonNames.forEach(buttonName => {
        buttons.push(
            builder.CardAction
                .dialogAction(session, buttonName, null, "Intent " + buttonName)
        )
    })
    return new builder.HeroCard(session)
        .title(title)
        .buttons(buttons);
}

const MENU_SCORING_NAME = "menuScoring";

var setMenuScore = (session, actionname, actionlabel) => {
    let userData = session.userData;

    if (!userData[MENU_SCORING_NAME]) {
        userData[MENU_SCORING_NAME] = [];
    }

    let found = false;
    for (let menuid in userData[MENU_SCORING_NAME]) {
        if (userData[MENU_SCORING_NAME][menuid].actionname === actionname) {
            userData[MENU_SCORING_NAME][menuid].count++;
            found = true;
        }
    }

    if (!found) {
        userData[MENU_SCORING_NAME].push(
            {
                actionname: actionname,
                count: 1,
                label: actionlabel
            }
        )
    }
};

var getMenuScore = (session, actionname) => {
    let userData = session.userData;

    if (userData[MENU_SCORING_NAME] && userData[MENU_SCORING_NAME][actionname]) {
        return userData[MENU_SCORING_NAME][actionname];
    }

    return 0;
};

var getMenuOrderedByScoreDesc = (session, trigger) => {
    if (trigger == undefined)
        trigger = 0;

    let menuScore = session.userData[MENU_SCORING_NAME];
    let sortedMenuList = [];

    for (let originalid in menuScore) {
        menuButton = menuScore[originalid];

        if (menuButton.count < trigger) continue;

        if (sortedMenuList.length === 0) {
            sortedMenuList.push(menuButton);
        }
        else {
            var insertAt = -1;
            for (let sortedid in sortedMenuList) {
                sortedMenuButton = sortedMenuList[sortedid];
                if (menuButton.count >= sortedMenuButton.count) {
                    insertAt = sortedid;
                    break;
                }
            }
            if (insertAt === -1)
                sortedMenuList.push(menuButton);
            else
                sortedMenuList.splice(insertAt, 0, menuButton);
        }
    }

    return sortedMenuList;
}