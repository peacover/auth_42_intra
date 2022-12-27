import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {Socket, Server} from "socket.io"

interface player_properties 
{
  input:  string;
  id:     string;
}

interface GameID 
{
  input: string;
}

interface Game 
{
  server: Server;

  width: number;
  height: number;
  aspectRatio : number;

  ball_radius: number;
  ball_speed: number;

  paddle_width: number;
  paddle_height: number;
  paddleSpeed: number;

  ball_x: number;
  ball_y: number;
  ball_direction_x: number;
  ball_direction_y: number;

  fr_paddle_x: number;
  fr_paddle_y: number;

  sec_paddle_x: number;
  sec_paddle_y: number;

  game_initializer: any;

  state: string;
  players: Array<string>;
  spects: Array<string>;

  scores: Array<number>;
  score_limit: number;
  lastscored: string;

  winner : string;
  room: string;
  numgames: number;
}

interface GameState {

  // dimentions :
  width: number;
  height: number;
  aspectRatio : number;


  //left paddle
  fr_paddle_x: number;
  fr_paddle_y: number;


  //right paddle
  sec_paddle_x: number;
  sec_paddle_y: number;

  paddle_width: number;
  paddle_height: number;

  // Ball properties :

  ball_x: number;
  ball_y: number;
  ball_direction_x: number;
  ball_direction_y: number;
  ball_radius: number;


  state: string; 

  players : Array<string>;

  scores: Array<number>;
  score_limit: number;

  winner: string;
  lastscored: string;
  
}

class Game {
  constructor(server: Server) {
    this.server = server;

    this.width = 800;
    this.height = 400;
    this.aspectRatio = 2 ;
  
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

    this.scores = [0,0];
    this.score_limit = 2;
    this.winner = "";
    this.lastscored = "";
    this.numgames = 0;
    
  }

  player_ids() 
  { 
    return this.players 
  }
  
  emit_and_clear(): void
  {
    this.server.to(this.room).emit("queue_status", this.queue_status());
    clearInterval(this.game_initializer);
  } 

  check_players_are_ready()
  {
    if (this.players.length === 2) 
    {
      console.log("players are ready");
      this.server.to(this.room).emit("queue_status", this.queue_status());
      this.starting_queue();
      this.update_status("play");
    } 
  }

  update_winner(player_id: string)
  {
    if(this.players[0] === player_id)
      this.winner = this.players[1];
    else
      this.winner = this.players[0];
  }

  push_player(player: string)
  {
    if (this.players.length < 2)
      this.players.push(player);
  }

  addSpec(spec: string)
  {
    this.spects.push(spec);
  }

  update_room(name: string)
  {
    this.room = name; 
  }

  update_status(state: string)
  {
    this.state = state
  }
  
  ball_properties() 
  {
    this.ball_x += this.ball_speed * this.ball_direction_x;
    this.ball_y += this.ball_speed * this.ball_direction_y;
  }

  starting_queue()
  {
    this.game_initializer = setInterval(this.My_loop_function, 1000/60, this);
  }

  My_loop_function(game: Game) 
  {
    game.ball_properties();
    game.ball_collision_with_screen();
    game.ball_collision_with_paddles();
    game.updateScore();
    game.server.to(game.room).emit("queue_status", game.queue_status());
  }

  initGame(id: string)
  {
    if(id === this.players[0])
    {
      this.ball_x = this.width / 10;
      this.ball_y = this.height / 5;
      console.log("player1 trying to start");
      this.ball_direction_x *= -1;
    }
    else if(id === this.players[1])
    {
      this.ball_x = this.width *  (9 / 10) ;
      this.ball_y = this.height / 5;
      this.ball_direction_x *= -1;
      console.log("player2 trying to start");
    }
    this.starting_queue();
    this.update_status("play");
  }


  updateScore()
  {
    if(this.ball_x > this.sec_paddle_x)
    {
        this.scores[0]++;
        console.log("scored1");
        this.update_status("scored");
        this.lastscored = this.players[0];
        clearInterval(this.game_initializer);
    }
    else if (this.ball_x < this.fr_paddle_x + this.paddle_width)
    {
      console.log("scored2");
        this.scores[1]++;
        this.update_status("scored");
        this.lastscored = this.players[1];
        clearInterval(this.game_initializer);
    }
    //BACK TO THIS 
    if(this.scores[0] === this.score_limit)
    {
      this.winner = this.players[0];
      this.update_status("endGame");
      clearInterval(this.game_initializer);
    }
    else if (this.scores[1] === this.score_limit)
    {
      this.winner = this.players[1];
      this.update_status("endGame");
      clearInterval(this.game_initializer);
    }
  }

  ball_collision_with_screen() 
  {
    if (this.ball_x + (this.ball_radius / 2) >= this.width)
      this.ball_direction_x *= -1;
    else if ( this.ball_x - (this.ball_radius / 2) <= 0)
      this.ball_direction_x *= -1;

    if (this.ball_y + (this.ball_radius / 2) >= this.height)
      this.ball_direction_y *= -1;
    else if (this.ball_y - (this.ball_radius / 2) <= 0)
      this.ball_direction_y *= -1;

    //console.log("my hieght is " + this.height);
  }
  
  ball_collision_with_paddles() 
  {
    // checking paddles on the left 
    if (this.ball_direction_x === -1)
    {
      if (this.ball_y > this.fr_paddle_y && this.ball_y < this.fr_paddle_y + this.paddle_height)
      {
        if ((this.ball_x - (this.ball_radius / 2) - this.paddle_width) <= 0)
          this.ball_direction_x *= -1;
      }
    }
    // checking paddles on the right 
    if (this.ball_direction_x === 1)
    {
      if (this.ball_y > this.sec_paddle_y && this.ball_y < this.sec_paddle_y + this.paddle_height)
      {
        if ((this.ball_x + (this.ball_radius / 2) + this.paddle_width) >= this.width)
          this.ball_direction_x *= -1;
      }
    }
  }

  update_paddles(payload: player_properties)
  {
    if (payload.input === "DOWN")
    {
      if (payload.id === this.players[0])
      {
        if (this.fr_paddle_y + this.paddleSpeed < this.height - this.paddle_height)
          this.fr_paddle_y += this.paddleSpeed;
        else
          this.fr_paddle_y = this.height - this.paddle_height;
      }
      else
      {
        if (this.sec_paddle_y + this.paddleSpeed < this.height - this.paddle_height)
          this.sec_paddle_y += this.paddleSpeed;
        else
          this.sec_paddle_y = this.height - this.paddle_height;
      }
    }
    else 
    {
      if (payload.id === this.players[0])
      {
        if (this.fr_paddle_y - this.paddleSpeed > 0)
          this.fr_paddle_y -= this.paddleSpeed;
        else
          this.fr_paddle_y = 0;
      }
      else
      {
        if (this.sec_paddle_y - this.paddleSpeed > 0)
          this.sec_paddle_y -= this.paddleSpeed;
        else 
          this.sec_paddle_y = 0;
      }
    }
  }

  player_activity(payload: player_properties) 
  {
    if(this.state === "scored" && payload.input === "ENTER")
      this.initGame(payload.id);
    else if (payload.input !== "ENTER")
      this.update_paddles(payload);
  }

  queue_status(): GameState 
  {
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
      players : this.players,

      scores : this.scores,
      score_limit : this.score_limit,
      winner : this.winner,
      lastscored : this.lastscored,
      
      width : this.width,
      height : this.height,
      aspectRatio : this.aspectRatio,

      paddle_height : this.paddle_height,
      paddle_width : this.paddle_width,
      ball_radius : this.ball_radius
    }
  }
}



@WebSocketGateway(5555, { 
  cors: {
  origin: '*',
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect 
{

  private  server: Server;
  private logger: Logger = new Logger("AppGateway");
  //game object
  private queues: Array<Game> = Array<Game>();
  private live_games: Array<Game> = Array<Game>();
  private cpt: number = 0;
  private player_with_queue_id: Map<string, number> = new Map<string, number>();

  afterInit(server: Server) {
    this.server = server;
    this.logger.log("INITIALIZED")
  }

  handleConnection(client: Socket, ...args: any[]) : void
  {
    this.logger.log(`User with the id  ${client.id} just logged in`);
  }

  handleDisconnect(player_ref: Socket) : void
  {
    const player_id: number = this.player_with_queue_id.get(player_ref.id);

    this.logger.log(`User with the id  ${player_ref.id} just logged out`);
    if (this.player_with_queue_id.has(player_ref.id))
    {
      this.queues[player_id].update_winner(player_ref.id);
      this.queues[player_id].update_status("disconnect");
      this.queues[player_id].emit_and_clear();
      this.player_with_queue_id.delete(player_ref.id);
    }
    else 
      this.logger.log(`User with the id  ${player_ref.id} wasn't involved in any game`);
  }

  @SubscribeMessage('spectJoined')
  spectJoinRoom(socket: Socket): void
  {
    let j: number=0;
    for(let i = 0; i < this.queues.length; i++)
    {
      if (this.queues[i].state === "play")
        j++;
    }
    //console.log("ANA RANI HNA WECH A 3CHIIIREEEEEEEEEEEEE "+j); 
    socket.emit('gameCount', j);
    //console.log("This is my socket 2: "+socket.id);
  }

  @SubscribeMessage('spectJoin')  
  spectJoin(socket: Socket,payload: any): void
  {
    let j: number=0;
    let x: number=0;

    for(let i = 0; i < this.queues.length; i++)
    {
      if (this.queues[i].state === "play")
      {
        j++;
        if (j.toString() === payload.value)
          x = i;
        // else
        // {
        //   socket.leave(this.queues[i].room);
        // }          
      }
    }
    // 
    // console.log("Number of live games now : "+this.queues[x].room);
    //console.log("This is my socket : "+payload.value);
    //if (this.queues.length === 1)
      socket.join(this.queues[x].room);
  }

  @SubscribeMessage('GameEnded')
  GameEnded(socket: Socket): void
  {
    console.log("GAME ENDED INDEEEEED" + socket.id);
  }

  @SubscribeMessage('player_join_queue')
  joinRoom(socket: Socket): void 
  {
    const room_id: string = socket.id;

    if (this.queues.length === 0)
    {
      this.queues.push(new Game(this.server));
      this.queues[0].update_room(room_id);
      socket.join(room_id);
    } 
    else if (this.queues[this.queues.length - 1].player_ids().length === 2)
    {
      this.queues.push(new Game(this.server));
      this.queues[this.queues.length - 1].update_room(room_id);
      socket.join(room_id);



    }
    else if (this.queues[this.queues.length - 1].player_ids().length === 1)
    {
      socket.join(this.queues[this.queues.length - 1].room); 
      this.cpt++;
    }       
    this.queues[this.queues.length - 1].push_player(socket.id);
    this.queues[this.queues.length - 1].check_players_are_ready();
    this.player_with_queue_id.set(socket.id, this.queues.length - 1);
  }

  @SubscribeMessage('player_pressed_key')
  handlePlayerInput(player_ref: Socket, payload: player_properties): void 
  {
    const player_id: number = this.player_with_queue_id.get(player_ref.id);

    this.queues[player_id].player_activity({ ...payload, id: player_ref.id })
  }
}
