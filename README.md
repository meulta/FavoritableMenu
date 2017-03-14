# Favoritable Menu Sample

**Here is a simple sample that helps your understand how you can create a menu that learns from user actions in a Chat Bot.**

**Use case**: you have a bot that contains a menu with a lot of options and you want to provide a quick access menu based on usage. 

**How it works**: each time the user clicks on a button we increase the "weight" of this button on a dictionary in the UserData. We then use this to build an ordered Favorite menu with actions that has been clicked 3 times or more.

# Test the Javascript sample:
- Clone this repo
- Go the the **js** folder
- Run **npm install**
- Run **node bot.js**
- Use the [bot fwk emulator](https://docs.botframework.com/en-us/tools/bot-framework-emulator/), say *hello*
- Click more that 3 times on an menu or submenu item
- Say *hello* again 
- You should now have a Favorite menu along the top menu

# Usage: 
- **setMenuScore(session, actionname, label)** function: increase a button weight. Actionname is the action that the button raises, label can let you store anything you want related to this action. Could be used to change the label button. (the sample does not use *label* to create the Favorite menu)
- **getMenuOrderedByScoreDesc(session, trigger)** function: get the list of actions and labels ordered by weight and that have a weight above the specified *trigger* value

# Contributors:
- [Ryan Volum](https://twitter.com/NotABotRyan)
- [Etienne Margraff](https://twitter.com/meulta)