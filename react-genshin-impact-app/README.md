# SBA-320

This is my submission for SBA-320. I have chosen to use an API for a popular game called Genshin Impact. The link to the API is as follows: https://genshin.dev/

This application is split into three sections, which allow for different pieces of data to be displayed in different ways for its users.

# Welcome Page

Being the root of this application, this will be the page that navigates the user to wherever they want to go. Here, there are links to "Playable Characters," "Weekly Bosses," and
"Build Your Team."

# Playable Characters

This section of the page is simply a display of all the playable characters from Genshin Impact. Using a base URL, the application finds all the names of the playable characters
and appends them to the end of that same URL in order to create a new link that has info specific to each character. Once a new link is concatenated, the application then gets data
for that specific character and outputs it through a CharacterCard component. It will list the character's name, there element and weapon affinity, a portrait icon, and a display of
their in-game rarity. Each card is colored dynamically based on the character's element.

# Weekly Bosses

This section of the page is similar to that of the playable characters page, but it focuses on displaying the weekly bosses found within the game. In a familiar fashion, the bosses are first loaded from a base URL, then concatenated onto that URL to produce a new link for boss-specific data. Once the boss-specific data has been fetched, it is then displayed inside a BossCard component. The BossCard components are structured in a manor similar to that of a carousel - only one displays at a time and there are "previous boss" and "next boss" buttons that allow the user to display the boss of their choosing. Each card displays the boss' name, portrait icon, description, and a container displaying the possible rewards for defeating that boss.

# Build Your Team

This section of the page is perhaps the most complex, as it allows users to design their teams and equip them with gear found in the game. A team in the game can only allow for 4 playable characters at once on a player's journey, so the teambuilder page allows for the modification of 4 different teammate slots. A user will be prompted to choose which slot they would like to modify. From there, user's will continue to be prompted for information that is listed dynamically as options from API calls. The amount of fetching proved to slow down the application quite a bit, so I resorted to making one-time calls and storing relevant data to the user's browser as localStorage. Once all the assets are loaded, users are further prompted to:

- choose from a list of playable characters
- choose from a list of equipable weapons, based on the character chosen
- choose from a list of possible artifact sets
- confirm whether they would like to mix artifact sets
- choose from another list of possible artifact sets, which will omit the first set the user chose if the user confirms they would like to mix sets

This is the general structure of how characters are powered-up within the game, as there is quite a lot of equipable items players can choose from.
