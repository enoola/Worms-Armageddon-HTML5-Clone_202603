Original Project from Ciaran McCann
<a href="https://github.com/CiaranMcCann/Worms-Armageddon-HTML5-Clone"> Github here</a>

Quick overview

* Written in Typescript (Compiles to Javascript)
* Uses a variety of HTML5 API’s (Canvas, WebSockets, Audio, Offline storage)
* Third-party libies used Jquery, Twitter-bootstrap, Socket.io
* Server-side tech Node.js/Socket.io running on a linode instance in the New york


## How to Build and Run (Modern Environment)

The project has been modernized to run on Node.js 20+ and compile with TypeScript 5.x.

### 0. Install Dependencies

```bash
npm install
```

### 1. Compilation

The project uses `tsc` for both the backend and frontend. You can use the following npm scripts:

*   **Build Frontend**: Bundles all source files into `src/Worms.js`.
    ```bash
    npm run build
    ```
*   **Build Server**: Compiles the backend logic into `src/networking/Server.js`.
    ```bash
    npm run build:server
    ```

### 2. Launching the Backend

Start the Node.js server. It listens on port 8080 by default.
```bash
node src/networking/Server.js
```

### 3. Launching the Frontend

Serve the root directory using any static web server. We recommend `serve`:
```bash
npx serve . -p 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

For details on the recent refactoring and known issues (Multiplayer/Sound), see [REFACTORING_KEY_POINTS.md](docs/REFACTORING_KEY_POINTS.md).

20260221

Project Summary: Worms Armageddon HTML5 Clone
Project Overview
This project is an HTML5/JavaScript recreation of the turn-based artillery strategy game "Worms Armageddon" originally developed by Team17. It was created as a university project by Ciarán McCann circa 2013-2014.

Core Technologies
Frontend
Language: TypeScript (compiles to JS). The version used is extremely old (~0.9) and uses deprecated syntax forms (e.g. function() => { ... } instead of () => { ... }).
Rendering: HTML5 Canvas API coupled with PhysicsSprite implementations for animations.
Physics: Uses Box2dWeb-2.1.a.3.min.js (a JavaScript port of Box2D) for game physics like movements, explosions, and weapons trajectories.
Dependencies: jQuery, Twitter-Bootstrap, Socket.io client.
Components: The game architecture includes distinct modules for Worm, Team, Player, Target, Game, GameStateManager, WormManager, WormAnimationManager, weapons, animations, environment (maps, terrain, waves), audio, and the graphical user interface.
Backend (Server)
Language: Node.js and TypeScript, serving the multiplayer game coordination.
Networking framework: Socket.io used to establish real-time websocket connections between users.
Modules: Located under src/networking/, handles Server, Client, Lobby, GameLobby, and LeaderBoard functionality.
Dependencies: express and validator.
Build System & Challenges
The original build pipeline was integrated into Visual Studio via a C# project file (WormsHTML5.csproj). It invoked tsc src/main.ts --out src/Worms.js.
Trying to compile this old codebase with any modern version of tsc results in hundreds of syntax errors. This is because lambda expressions inside the codebase use deprecated syntax that was removed in later TypeScript specs.