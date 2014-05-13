cqwrap
======

## develop

the cocos2d-html5 game creator

(If you got an error while create the game project on windows, use administrator to run console.)

```bash
npm install -g cqwrap
cqwrap -o my_game
cd my_game
./server.sh
```

visit http://localhost:8000

## build

```bash
npm install -g requirejs
```

```bash
r.js -o build.js
```

```bash
mv main.js main-src.js
mv dist/main.js .
```
