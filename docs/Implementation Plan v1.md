TypeScript and Server Modernization Plan
The goal is to modernize the Worms Armageddon HTML5 Clone to compile with modern tsc and run flawlessly on modern Node.js versions.

Proposed Changes
Phase 1: TypeScript Legacy Syntax Refactor
Execute a global regex replacement across all 
.ts
 files to correct the legacy lambda syntax stripped from TS >0.9.
Replace patterns matching function (args) => { with (args) => {. We will use a script to ensure we capture all instances across the src/ directory.
Phase 2: Server Dependencies (
src/networking/package.json
)
Upgrade socket.io from ^0.9.16 to latest (^4.x).
Upgrade express to ^4.x.
Upgrade validator to the latest version.
Remove any direct dependencies to obsolete Node 0.10.x specific engines and run npm install gracefully using modern Node.
Phase 3: Socket.io 4.x Migration
src/networking/Server.ts

Refactor the main connection wrapper: io.sockets.on('connection', ...) becomes io.on('connection', ...).
src/networking/Lobby.ts

Replace obsolete socket.set('key', val) and socket.get('key', cb) methods. Modern Socket.io allows you to attach data directly to socket.data (e.g., socket.data.userId = val).
We will rewrite the nested .get() callbacks into synchronous data access (userId = socket.data.userId), which greatly flattens the callback hell in 
Lobby.ts
.
Ensure broadcasting socket.broadcast.to(room).emit uses the proper current APIs.
Phase 4: Build System Updates
The README dictates building the bundle via tsc src/main.ts src/networking/Server.ts --out src/Worms.js. Modern tsc limits --outFile to AMD or System module targets.
We will update the build command or introduce a lightweight build script to bundle the frontend properly if --outFile fails.
Verification Plan
Automated Steps
TypeScript Compilation: Run tsc across the source code and verify 0 syntax error returns regarding the { expected errors.
Server Startup: Run node dist/networking/Server.js or ts-node src/networking/Server.ts to ensure the server bootstraps without Socket.io v8 crashes.
Manual Verification
App Launch: The user should open index.htm or serve the directory natively, and the game menu should render without Javascript console errors.
Lobby Connectivity: Verifying that a client can choose "Quick Game" and connect to the local Node.js Server without crashing.

Comment
⌥⌘M
