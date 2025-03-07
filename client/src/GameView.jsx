import React, { useState, useEffect } from "react";
import Voting from "./Voting.jsx";
import WerewolfChat from "./WerewolfChat.jsx";
import villageDay from "./images/villageDay.jpg";
import villageNight from "./images/villageNight.jpg";
import EndGameModal from "./EndGame.jsx";

const GameView = ({
  myId,
  gameState,
  timer,
  day,
  vote,
  docChoice,
  endGame,
  preGame,
  werewolves,
  villagers,
  werewolfMessages,
  handleWerewolfChat,
  handleResetGame,
}) => {
  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState(false);

  let role;
  let alive;
  let myClass;
  gameState.players.forEach((player) => {
    if (player.id === myId) {
      role = player.role;
      alive = player.alive;
    }
  });

  return (
    <div id="gameView">
      <div id="role-container">
        <h1 id="role">You are a {role}</h1>
        <div id="timer">Time left: {timer} </div>
      </div>

      <div id="messages-container">
        <div id = "gameMessage">
          {endGame ? (
            <EndGameModal endGame={endGame} clickHandler={handleResetGame} />
          ) : null}
          {preGame ? (
            <div>
              Welcome to werewolf! This is a small and tight-knit town, so
              introduce yourselves and get to know each other! But be careful,
              some may not be what they seem...
            </div>
          ) : null}
          {day && !preGame ? (
            <div>
              Talk amongst yourselves and try to figure out who is really a
              werewolf! Vote below and at the end of the day the one with the
              most votes will be killed.
            </div>
          ) : null}
          {!day ? (
            <div>
              It is dangerous to walk these streets alone at night. Pray the
              werewolves don't find you!
            </div>
          ) : null}
        </div>
        <div id="remaining">
           {/* <h2 id="playersRemaining">Players Remaining</h2> */}
          <div style={{float: 'left', marginLeft: '0px'}}>Remaining Werewolves: {werewolves}</div>
          <div style={{float: 'right', marginRight: '20px'}}>Remaining Villagers: {villagers}</div>
        </div>
      </div>
      <div id="villageImage">
        <img src={day? villageDay : villageNight}/>
      </div>
        <div id="aliveDeadList">
          <h3>Current players</h3>
          {gameState.players.map((player) => {
            if (player.alive) {
              myClass = "aliveDeadEntry alive";
            } else {
              myClass = "aliveDeadEntry dead";
            }
            return (
              <div key={player.id} className={myClass}>{player.name} is {player.alive ? 'Alive' : 'Dead'}</div>
            )})}
        </div>
      <Voting
        gameState={gameState}
        day={day}
        myId={myId}
        vote={vote}
        docChoice={docChoice}
        preGame={preGame}
        role={role}
      />
      {!day && role === "werewolf" && alive ? (
        <WerewolfChat
          werewolfMessages={werewolfMessages}
          handleWerewolfChat={handleWerewolfChat}
        />
      ) : null}
    </div>
  );
};
export default GameView;
