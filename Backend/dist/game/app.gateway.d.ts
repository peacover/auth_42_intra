import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from "socket.io";
interface player_properties {
    input: string;
    id: string;
}
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private server;
    private logger;
    private queues;
    private live_games;
    private cpt;
    private player_with_queue_id;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(player_ref: Socket): void;
    spectJoinRoom(socket: Socket): void;
    spectJoin(socket: Socket, payload: any): void;
    GameEnded(socket: Socket): void;
    joinRoom(socket: Socket): void;
    handlePlayerInput(player_ref: Socket, payload: player_properties): void;
}
export {};
