import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> auth_master

import P5Wrapper from 'react-p5';
import p5 from 'p5';
import { Paddle } from "./Lobby"
import { GameState } from "./Ball"
import { ReactP5Wrapper } from "react-p5-wrapper";
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { stat } from "fs";
import  Spectator  from './spectator_mod';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


<<<<<<< HEAD
=======
  
  // await axios.get( process.env.REACT_APP_BACKEND_URL+ "/chat/myChannels", 
  // {withCredentials: true} 
  // ).then((res)=>{
  //   var myChannels : Array<string> = [];
  //   for (let index = 0; index < res.data.length; index++) {
  //     myChannels.push(res.data[index].channelId);
  //   }
  //   myChannels.push(userLogin);
  //   // mychannels.pushback(userlogin)
  //   socket.emit('joinRoom', myChannels)
  // }).catch((err)=>{
  // })
  //}


>>>>>>> auth_master
const SketchPong = () => {

  const socket = useRef(null as null | Socket);
  const gameState = useRef(null as null | GameState);
  const [state, setState] = useState("waiting");
  const [Cpt, setCpt] = useState(0);


  const [my_width, setWidth] = useState(window.innerWidth);
  const [m_height, setHeight] = useState(window.innerHeight);

  const getWindowSizee = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }



<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> auth_master
=======
>>>>>>> auth_master
  let ok = 0;
  let hh = 0;
  let yarb = 0;
  const [layhfdk, setLayhfdk] = useState(0);
  let button_cpt = 0;
  let buttons: p5.Element[] = [];

  let aspectRatio: number = 0;

  let absoluteWidth: number = 0;
  let relativeWidth: number = 0;

  let absoluteHeight: number = 0;
  let relativeHeight: number = 0;

  let scalingRatio: number = 0;

  function buttonPressed(nbr: number) {
    button_cpt = 1;
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("nbr " + nbr);
=======
    //console.log("nbr " + nbr);
>>>>>>> auth_master
=======
    //console.log("nbr " + nbr);
>>>>>>> auth_master
    if (socket.current != null)
      socket.current.emit("spectJoin", { value: nbr });
    setState("started watching");
    //hh = c;
    //buttons.splice(0, c);
    //
  }

<<<<<<< HEAD
<<<<<<< HEAD
  useEffect(() => {
    socket.current = io("http://localhost:5555").on("connect", () => {
=======
=======
>>>>>>> auth_master

  useEffect(() => {


    socket.current = io("http://localhost:4000", {
      withCredentials: true,
    }).on("connect", () => {
<<<<<<< HEAD
>>>>>>> auth_master
=======
>>>>>>> auth_master

    if (socket.current != null)
    {
        socket.current.on('gameCount', (data) => {
        hh = data;
        setLayhfdk(+ data);
<<<<<<< HEAD
<<<<<<< HEAD
        console.log("wch a 3chiri " + layhfdk);
=======
        //console.log("wch a 3chiri " + layhfdk);
>>>>>>> auth_master
=======
        //console.log("wch a 3chiri " + layhfdk);
>>>>>>> auth_master
      });      
    }
    if (state == "play" && layhfdk === 0)
      socket.current?.emit("player_join_queue");
      else if (state == "spect")
      {

        socket.current?.emit("spectJoined");
        if (socket.current != null)
          socket.current.on('gameCount', (data) => {
            hh = data;
            setLayhfdk(+ data);
<<<<<<< HEAD
<<<<<<< HEAD
            console.log("wch a 3chiri " + layhfdk);
=======
            //console.log("wch a 3chiri " + layhfdk);
>>>>>>> auth_master
=======
            //console.log("wch a 3chiri " + layhfdk);
>>>>>>> auth_master
          });
      }

      socket.current?.on("queue_status", (data: GameState) => {

        if (state == "waiting") {

        }
        gameState.current = data;
      });

      return () => {
        socket.current?.removeAllListeners();
        socket.current?.close();
      }
    });
  }, [state, layhfdk]);


<<<<<<< HEAD
<<<<<<< HEAD
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth / 2, (window.innerWidth / 4)).parent(canvasParentRef)
    
=======
=======
>>>>>>> auth_master
  const setup_2 = (p5: p5Types,canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth/4 , (window.innerWidth / 8)).parent(canvasParentRef)

    p5.background(70);

  }

  function draw_2(p5: p5Types)
  {
    p5.resizeCanvas(window.innerWidth/2 , (window.innerWidth / 8))

    p5.background(70);
    function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
    const player_names = (p5: p5Types) => {
      // this method will allow us to draw the score line of both players
      // we start of by filling the whole screen black 
      // we allign the text in the center and we can rectrieve the score of each players using the gamestate that is constantly
      //retrieving data from the backend of our code and then we display it
      // how to create as many buttons as i want based on a number 

      p5.fill(0);
      p5.textSize((getWindowSize().innerHeight * 20) / getWindowSize().innerHeight);
      p5.textAlign(p5.CENTER);
      //p5.resizeCanvas(getWindowSize().innerWidth, getWindowSize().innerHeight);
      //console.log(relativeHeight);
      if (gameState.current != null) {
        p5.text(
          gameState.current.players_names[0],
          (getWindowSize().innerWidth / 46) * 7,
          getWindowSize().innerWidth / 32
        );

        // p5.loadImage(gameState.current.players_avatar[0]);
        // p5.loadImage(gameState.current.players_avatar[1]);

        p5.text(
          gameState.current.players_names[1],
          (getWindowSize().innerWidth / 24) * 9,
          getWindowSize().innerWidth / 32
        );



      }

    };
    player_names(p5);

  }

  const setup = (p5: p5Types,canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth / 2, (window.innerWidth / 4)).parent(canvasParentRef)

<<<<<<< HEAD
>>>>>>> auth_master
=======
>>>>>>> auth_master
    p5.background(122);

  }

  function draw(p5: p5Types) {
    function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }

    function get_window_height() {
      return getWindowSize().innerHeight;
    }
    if (gameState.current != null) {
      aspectRatio = gameState.current.aspectRatio;

      absoluteWidth = gameState.current.width;
      relativeWidth = getWindowSize().innerWidth / 2;


      absoluteHeight = absoluteWidth / aspectRatio;
      relativeHeight = (relativeWidth / aspectRatio);

      scalingRatio = relativeWidth / absoluteWidth;
<<<<<<< HEAD
<<<<<<< HEAD
      console.log("MY section width is  " + relativeWidth + " my section height is " + relativeHeight);
=======
      //console.log("MY section width is  " + relativeWidth + " my section height is " + relativeHeight);
>>>>>>> auth_master
=======
      //console.log("MY section width is  " + relativeWidth + " my section height is " + relativeHeight);
>>>>>>> auth_master
    }

    p5.resizeCanvas(window.innerWidth /2 , window.innerWidth/4);
    p5.background(122);

<<<<<<< HEAD
<<<<<<< HEAD
=======
    

>>>>>>> auth_master
=======
    

>>>>>>> auth_master
    if (gameState.current != null) 
    {

      const drawClickToStartText = (p5: p5Types) => {
        if (gameState.current != null && socket.current != null) {


          let width = getWindowSize().innerWidth;
          let height = getWindowSize().innerHeight;
          if (gameState.current.state === "scored") {
            p5.fill(0);
            p5.textSize(((relativeWidth) / 35));
            p5.textAlign(p5.CENTER);
            const scores = gameState.current.scores;
            const scoresSum = scores[0] + scores[1];
            if (gameState.current.players.indexOf(socket.current.id) == -1) {
              // this is in case it's a spectator he can only watch without interfering in the game because his id couldn't be find 
              // in the players id array 
              p5.text("Waiting for players to start the game",
                (width) / 4,
                width / 16
              );
            }
            else {
              // in here both the players recieve text in the middle
              // the one who scored is displaying the waiting text while the other one the click enter
              // when he does click enter the ball gets respawned in the middle with the scores updated and the ball moving again
              // thus creating a new partido if you would call it that 

              p5.text(
                socket.current.id === gameState.current.lastscored
                  ? "Waiting for oponent to start the game"
                  : "Click enter to start the game ",
                (width) / 4,
                width / 16
              );
            }
          }
        }

      };

<<<<<<< HEAD
<<<<<<< HEAD
=======
      

>>>>>>> auth_master
=======
      

>>>>>>> auth_master
      const drawScore = (p5: p5Types) => {
        // this method will allow us to draw the score line of both players
        // we start of by filling the whole screen black 
        // we allign the text in the center and we can rectrieve the score of each players using the gamestate that is constantly
        //retrieving data from the backend of our code and then we display it
        // how to create as many buttons as i want based on a number 

        p5.fill(0);
        p5.textSize((getWindowSize().innerHeight * 20) / getWindowSize().innerHeight);
        p5.textAlign(p5.CENTER);
        //p5.resizeCanvas(getWindowSize().innerWidth, getWindowSize().innerHeight);
        //console.log(relativeHeight);
        if (gameState.current != null) {
          p5.text(
            gameState.current.scores[0],
            (getWindowSize().innerWidth / 32) * 7,
            getWindowSize().innerWidth / 8
          );
          p5.text(
            gameState.current.scores[1],
            (getWindowSize().innerWidth / 32) * 9,
            getWindowSize().innerWidth / 8
          );
          if (gameState.current.state == "endGame") {
            p5.text("Player 1 Won the game",
              (getWindowSize().innerWidth) / 4,
              getWindowSize().innerWidth / 16
            );
          }

        }

      };
      //p5.clear();


      // if (gameState.current.state == "endGame")
      //   console.log("hana habibi");
      //console.log("Asbhan lah " + gameState.current.state);
      // p5.resizeCanvas(getWindowSize().innerWidth   , relativeHeight);
      // p5.background(122);
<<<<<<< HEAD
<<<<<<< HEAD
      drawClickToStartText(p5);
      drawScore(p5);
      console.log("Heres my aspect ratio " + aspectRatio);
=======
=======
>>>>>>> auth_master
      //console.log("Plyaer name is "+gameState.current.players_names[0]);
      drawClickToStartText(p5);
      drawScore(p5);
      
     //player_names(p5);
      //console.log("Heres my aspect ratio " + aspectRatio);
<<<<<<< HEAD
>>>>>>> auth_master
=======
>>>>>>> auth_master
      //the p5.rect method allows us to create a rectangle using the properties in the arguments x,y,width,heigh
      p5.rect(gameState.current.fr_paddle_x * scalingRatio, gameState.current.fr_paddle_y * scalingRatio, gameState.current.paddle_width * scalingRatio, gameState.current.paddle_height * scalingRatio);

      p5.rect(gameState.current.sec_paddle_x * scalingRatio, gameState.current.sec_paddle_y * scalingRatio, gameState.current.paddle_width * scalingRatio, gameState.current.paddle_height * scalingRatio);
      //the p5.circle method allows us to create a circle using the properties in the arguments x,y,Raduis
      p5.circle(gameState.current.ball_x * scalingRatio, gameState.current.ball_y * scalingRatio, gameState.current.ball_radius * scalingRatio);


      if (socket.current != null) {
        const handlePlayerOneInput = (p5: p5Types) => {
          // this is where we check for the first player's input and how he moves the paddles using W and S 
          // whenever he uses a key we emit an event called playerInput that will later on be received from the backend
          // when the backend recieved the emit he will update the paddles properties(x,y) wether lesser or higher 
          //when the properties gets updated since wr using the same socket of the player he can retrieve the new x,y of paddles
          //then we can clear the whole ground we playing on and design the paddls on it's new x and y 
          //since this update gets called infinitly it will look like it's moving based on your needs 
          if (socket.current != null && gameState.current != null) {
            if (p5.keyIsDown(13) && socket.current.id !== gameState.current.lastscored) {
              socket.current.emit("player_pressed_key", { input: "ENTER" });
            }
            if (p5.keyIsDown(87)) {
              socket.current.emit("player_pressed_key", { input: "UP" });
            }

            if (p5.keyIsDown(83)) {
              socket.current.emit("player_pressed_key", { input: "DOWN" });
            }
          }
        }
        const handlePlayerTwoInput = (p5: p5Types) => {
          if (socket.current != null && gameState.current != null) {
            if (p5.keyIsDown(13) && socket.current.id !== gameState.current.lastscored) {
              socket.current.emit("player_pressed_key", { input: "ENTER" });
            }
            if (p5.keyIsDown(87)) {
              socket.current.emit("player_pressed_key", { input: "UP" });
            }
            if (p5.keyIsDown(83)) {
              socket.current.emit("player_pressed_key", { input: "DOWN" });
            }
          }

        }
        // 
        // ok in here like we know every player got a socket and every socket got an Id for ex adc24a4cad2c4adc mix of numbers and letters 
        // but how can we know which one of them is player1 and which one is player 2
        // in here we use the indexOf method that can help us find the first occurence that is equal to the one we search for
        // you can say we store these sockets id in an array arr = ["Sdcsdcs51s0", "sdc5s5d2cs12"];
        // when we call arr.indexOf("Sdcsdcs51s0") which is the first one it will print out 0 
        //when we receive 1 or 0 or we call their own paddle updating functions
        //console.log("Index is "+(socket.current?.id));
        if (gameState.current.players.indexOf(socket.current?.id) === 0)
          handlePlayerOneInput(p5);
        if (gameState.current.players.indexOf(socket.current.id) === 1)
          handlePlayerTwoInput(p5);
      }

    }
  }
  //};
  return <>

    {
      state === "waiting" ?
        <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
          <button className="p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300" onClick={() => {
            //alert()

            setState("play");
            setCpt(Cpt + 1);

          }}
          >
            Play a Game
          </button>

          <button onClick={() => {
            //alert() 
            
            setState("spect")

          }}
          >
            Spectate a Game
          </button>
        </div>


        : (state === "spect" ?
          
          <div>
            {/* {Array.from({ length: layhfdk }, (v, i) => i + 1).map(i => (
              <button key={i} onClick={() => buttonPressed(i)}>YAWDI HAAAANAAAAA {i}</button>
            ))} */}
            <Spectator/>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
          : <div className="canvas-container"><Sketch setup={setup} draw={draw}  /></div>)
=======
=======
>>>>>>> auth_master
          : <div className="canvas-container">
            <div className="component1">
              <Sketch setup={setup_2} draw={draw_2}  />
            </div>
            <Sketch setup={setup} draw={draw}  />
            </div>)
<<<<<<< HEAD
>>>>>>> auth_master
=======
>>>>>>> auth_master



    }

  </>
  return <Sketch setup={setup} draw={draw} />;
};


export default SketchPong;

