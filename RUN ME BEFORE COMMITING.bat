node -p -e "require('fs').writeFileSync('./data/commands.json', JSON.stringify(require('./data/commands.json'),null,2))"
node -p -e "require('fs').writeFileSync('./data/events.json', JSON.stringify(require('./data/events.json'),null,2))"
node -p -e "require('fs').writeFileSync('./data/players.json', JSON.stringify(require('./data/players.json'),null,2))"
node -p -e "require('fs').writeFileSync('./data/settings.json', JSON.stringify(require('./data/settings.json'),null,2))"