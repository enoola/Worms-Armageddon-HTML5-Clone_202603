declare var global: any;
/**
 *  
 * Server.js
 *
 *  License: Apache 2.0
 *  author:  Ciarn McCann
 *  url: http://www.ciaranmccann.me/
 */
//<reference path="../../external/socket.io-0.9.d.ts"/>
///<reference path="ServerUtilies.ts"/>
///<reference path="GameLobby.ts"/>
///<reference path="Events.ts"/>
///<reference path="Lobby.ts"/>

declare var require
declare var Util;
declare var io: any;
declare var Events: any;
declare var ServerUtilies: any;
declare var GameLobby: any;
declare var ServerSettings: any;
declare var Lobby: any;

//var io;

// HACK
// Had to give up the benfits of types in this instance, as a problem with the way ES6 proposal module system
// works with Node.js modules. http://stackoverflow.com/questions/13444064/typescript-conditional-module-import-export
try {
    global.Events = require('./Events'); global.ServerUtilies = require('./ServerUtilies'); global.GameLobby = require('./GameLobby'); global.ServerSettings = require('./ServerSettings'); global.Lobby = require('./Lobby'); global.Util = require('util');



} catch (error) { }

class GameServer {

    lobby: any;


    constructor(port) {

        io = require('socket.io')(port, { cors: { origin: "*" } });
        this.lobby = new Lobby();

        io.on('connection', (socket) => {
            this.lobby.onConnection(socket, io);
            this.lobby.server_init(socket, io);
            this.lobby.onDisconnection(socket, io);

            //This allows the clients to get the  current time of the server
            socket.on(Events.client.GET_GAME_TIME, (msg, func) => {
                func(Date.now());
            });
        });

        this.init();
    }

    init() {
        // Setup a default lobby
        //this.lobby.server_createGameLobby("Default", 2);
    }

}


declare var exports: any;
var serverInstance = new GameServer(8080);

exports.instance = serverInstance;
