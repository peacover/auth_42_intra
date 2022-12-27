"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
class Game {
    constructor(server) {
        this.server = server;
        this.width = 800;
        this.height = 400;
        this.aspectRatio = 2;
        this.ball_radius = 10;
        this.ball_speed = 0.25;
        this.paddle_width = 10;
        this.paddle_height = 100;
        this.paddleSpeed = 10;
        this.ball_x = this.width / 2;
        this.ball_y = this.height / 2;
        this.ball_direction_x = 1;
        this.ball_direction_y = 1;
        this.fr_paddle_x = 0;
        this.fr_paddle_y = 0;
        this.sec_paddle_x = this.width - this.paddle_width;
        this.sec_paddle_y = 0;
        this.state = "waiting";
        this.players = [];
        this.room = "";
        this.scores = [0, 0];
        this.score_limit = 2;
        this.winner = "";
        this.lastscored = "";
        this.numgames = 0;
    }
    player_ids() {
        return this.players;
    }
    emit_and_clear() {
        this.server.to(this.room).emit("queue_status", this.queue_status());
        clearInterval(this.game_initializer);
    }
    check_players_are_ready() {
        if (this.players.length === 2) {
            console.log("players are ready");
            this.server.to(this.room).emit("queue_status", this.queue_status());
            this.starting_queue();
            this.update_status("play");
        }
    }
    update_winner(player_id) {
        if (this.players[0] === player_id)
            this.winner = this.players[1];
        else
            this.winner = this.players[0];
    }
    push_player(player) {
        if (this.players.length < 2)
            this.players.push(player);
    }
    addSpec(spec) {
        this.spects.push(spec);
    }
    update_room(name) {
        this.room = name;
    }
    update_status(state) {
        this.state = state;
    }
    ball_properties() {
        this.ball_x += this.ball_speed * this.ball_direction_x;
        this.ball_y += this.ball_speed * this.ball_direction_y;
    }
    starting_queue() {
        this.game_initializer = setInterval(this.My_loop_function, 1000 / 60, this);
    }
    My_loop_function(game) {
        game.ball_properties();
        game.ball_collision_with_screen();
        game.ball_collision_with_paddles();
        game.updateScore();
        game.server.to(game.room).emit("queue_status", game.queue_status());
    }
    initGame(id) {
        if (id === this.players[0]) {
            this.ball_x = this.width / 10;
            this.ball_y = this.height / 5;
            console.log("player1 trying to start");
            this.ball_direction_x *= -1;
        }
        else if (id === this.players[1]) {
            this.ball_x = this.width * (9 / 10);
            this.ball_y = this.height / 5;
            this.ball_direction_x *= -1;
            console.log("player2 trying to start");
        }
        this.starting_queue();
        this.update_status("play");
    }
    updateScore() {
        if (this.ball_x > this.sec_paddle_x) {
            this.scores[0]++;
            console.log("scored1");
            this.update_status("scored");
            this.lastscored = this.players[0];
            clearInterval(this.game_initializer);
        }
        else if (this.ball_x < this.fr_paddle_x + this.paddle_width) {
            console.log("scored2");
            this.scores[1]++;
            this.update_status("scored");
            this.lastscored = this.players[1];
            clearInterval(this.game_initializer);
        }
        if (this.scores[0] === this.score_limit) {
            this.winner = this.players[0];
            this.update_status("endGame");
            clearInterval(this.game_initializer);
        }
        else if (this.scores[1] === this.score_limit) {
            this.winner = this.players[1];
            this.update_status("endGame");
            clearInterval(this.game_initializer);
        }
    }
    ball_collision_with_screen() {
        if (this.ball_x + (this.ball_radius / 2) >= this.width)
            this.ball_direction_x *= -1;
        else if (this.ball_x - (this.ball_radius / 2) <= 0)
            this.ball_direction_x *= -1;
        if (this.ball_y + (this.ball_radius / 2) >= this.height)
            this.ball_direction_y *= -1;
        else if (this.ball_y - (this.ball_radius / 2) <= 0)
            this.ball_direction_y *= -1;
    }
    ball_collision_with_paddles() {
        if (this.ball_direction_x === -1) {
            if (this.ball_y > this.fr_paddle_y && this.ball_y < this.fr_paddle_y + this.paddle_height) {
                if ((this.ball_x - (this.ball_radius / 2) - this.paddle_width) <= 0)
                    this.ball_direction_x *= -1;
            }
        }
        if (this.ball_direction_x === 1) {
            if (this.ball_y > this.sec_paddle_y && this.ball_y < this.sec_paddle_y + this.paddle_height) {
                if ((this.ball_x + (this.ball_radius / 2) + this.paddle_width) >= this.width)
                    this.ball_direction_x *= -1;
            }
        }
    }
    update_paddles(payload) {
        if (payload.input === "DOWN") {
            if (payload.id === this.players[0]) {
                if (this.fr_paddle_y + this.paddleSpeed < this.height - this.paddle_height)
                    this.fr_paddle_y += this.paddleSpeed;
                else
                    this.fr_paddle_y = this.height - this.paddle_height;
            }
            else {
                if (this.sec_paddle_y + this.paddleSpeed < this.height - this.paddle_height)
                    this.sec_paddle_y += this.paddleSpeed;
                else
                    this.sec_paddle_y = this.height - this.paddle_height;
            }
        }
        else {
            if (payload.id === this.players[0]) {
                if (this.fr_paddle_y - this.paddleSpeed > 0)
                    this.fr_paddle_y -= this.paddleSpeed;
                else
                    this.fr_paddle_y = 0;
            }
            else {
                if (this.sec_paddle_y - this.paddleSpeed > 0)
                    this.sec_paddle_y -= this.paddleSpeed;
                else
                    this.sec_paddle_y = 0;
            }
        }
    }
    player_activity(payload) {
        if (this.state === "scored" && payload.input === "ENTER")
            this.initGame(payload.id);
        else if (payload.input !== "ENTER")
            this.update_paddles(payload);
    }
    queue_status() {
        return {
            ball_x: this.ball_x,
            ball_y: this.ball_y,
            ball_direction_x: this.ball_direction_x,
            ball_direction_y: this.ball_direction_y,
            fr_paddle_x: this.fr_paddle_x,
            fr_paddle_y: this.fr_paddle_y,
            sec_paddle_x: this.sec_paddle_x,
            sec_paddle_y: this.sec_paddle_y,
            state: this.state,
            players: this.players,
            scores: this.scores,
            score_limit: this.score_limit,
            winner: this.winner,
            lastscored: this.lastscored,
            width: this.width,
            height: this.height,
            aspectRatio: this.aspectRatio,
            paddle_height: this.paddle_height,
            paddle_width: this.paddle_width,
            ball_radius: this.ball_radius
        };
    }
}
let AppGateway = class AppGateway {
    constructor() {
        this.logger = new common_1.Logger("AppGateway");
        this.queues = Array();
        this.live_games = Array();
        this.cpt = 0;
        this.player_with_queue_id = new Map();
    }
    afterInit(server) {
        this.server = server;
        this.logger.log("INITIALIZED");
    }
    handleConnection(client, ...args) {
        this.logger.log(`User with the id  ${client.id} just logged in`);
    }
    handleDisconnect(player_ref) {
        const player_id = this.player_with_queue_id.get(player_ref.id);
        this.logger.log(`User with the id  ${player_ref.id} just logged out`);
        if (this.player_with_queue_id.has(player_ref.id)) {
            this.queues[player_id].update_winner(player_ref.id);
            this.queues[player_id].update_status("disconnect");
            this.queues[player_id].emit_and_clear();
            this.player_with_queue_id.delete(player_ref.id);
        }
        else
            this.logger.log(`User with the id  ${player_ref.id} wasn't involved in any game`);
    }
    spectJoinRoom(socket) {
        let j = 0;
        for (let i = 0; i < this.queues.length; i++) {
            if (this.queues[i].state === "play")
                j++;
        }
        socket.emit('gameCount', j);
    }
    spectJoin(socket, payload) {
        let j = 0;
        let x = 0;
        for (let i = 0; i < this.queues.length; i++) {
            if (this.queues[i].state === "play") {
                j++;
                if (j.toString() === payload.value)
                    x = i;
            }
        }
        socket.join(this.queues[x].room);
    }
    GameEnded(socket) {
        console.log("GAME ENDED INDEEEEED" + socket.id);
    }
    joinRoom(socket) {
        const room_id = socket.id;
        if (this.queues.length === 0) {
            this.queues.push(new Game(this.server));
            this.queues[0].update_room(room_id);
            socket.join(room_id);
        }
        else if (this.queues[this.queues.length - 1].player_ids().length === 2) {
            this.queues.push(new Game(this.server));
            this.queues[this.queues.length - 1].update_room(room_id);
            socket.join(room_id);
        }
        else if (this.queues[this.queues.length - 1].player_ids().length === 1) {
            socket.join(this.queues[this.queues.length - 1].room);
            this.cpt++;
        }
        this.queues[this.queues.length - 1].push_player(socket.id);
        this.queues[this.queues.length - 1].check_players_are_ready();
        this.player_with_queue_id.set(socket.id, this.queues.length - 1);
    }
    handlePlayerInput(player_ref, payload) {
        const player_id = this.player_with_queue_id.get(player_ref.id);
        this.queues[player_id].player_activity(Object.assign(Object.assign({}, payload), { id: player_ref.id }));
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('spectJoined'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "spectJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('spectJoin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "spectJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('GameEnded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "GameEnded", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('player_join_queue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('player_pressed_key'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handlePlayerInput", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5555, {
        cors: {
            origin: '*',
        }
    })
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map