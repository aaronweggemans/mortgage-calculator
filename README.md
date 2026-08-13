# Hypotheek calculator

Dit project is een plugin dat is gemaakt om de hypotheek te berekenen in Nederland.
Het is gemaakt om te implementeren op een WordPress website en staat op het moment gedeployed op https://www.jwz-fd.nl/.
De plugin is gemaakt met behulp van PHP en JavaScript.

## Opstarten van het project (ontwikkelmodus)

Dit project is een Angular applciatie die is gemaakt met behulp van de Angular CLI.
Om het project op te starten, volg de onderstaande stappen.

1. Zorg ervoor dat je huidige node versie overeen komt met wat er in het `.nvmrc` bestand staat.
2. Installeer de binaries en dependencies met het volgende commando met `npm ci`
3. Start het project met `npm run start`

Nu kan je werken aan de applicatie lokaal.

### Bouw het project

Het project moet gebouwd worden voordat het kan worden gebruikt als WordPress plugin.
Om de applicatie te bouwen, volg de volgende stappen:

1. Bouw de applicatie `npm run build:production`
2. Om het `web-component` gebruik het volgende commando: `npm run build:wordpress`. Dit command zorgt ervoor dat in `wp-mortgage-calculator` een folder `web-component` wordt gemaakt.
   Hierin staat de het javascript bestand en de assets.
3. Om de plugin te kunnen gebruiken moet de folder `wp-mortgage-calculator` gezipt worden en geupload worden onder de plugins in WordPress. Dit kan je doen door de comamnd `npm run build:wordpress-plugin` te runnen.

### Daadwerkelijk web-component lokaal testen

Om het web-component te testen kan je de volgende stappen volgen:

1. Zorg ervoor dat je de applicatie hebt gebouwd met `npm run build:wordpress`.
2. Navigeer naar de folder `wp-mortgage-calculator` en start een lokale server met het volgende commando: `npx http-server`.
3. Ga naar de URL en bekijk of de applicatie draait!
