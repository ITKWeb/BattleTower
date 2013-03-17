package services

import play.api.libs.iteratee.Concurrent.Channel
import play.api.libs.json.JsValue
import play.api.libs.json.Json
import models.Game

object InterpretCmd {

  def apply(json:JsValue, channelClient:Channel[JsValue]) = {
    val uuidGame = (json \ "idGame").as[String]
    val game = Games.games.get(uuidGame).get
    val cmd = (json \ "cmd").as[String]
    val numPlayer = (json \ "num").as[Int]
    cmd match {
      case "endEditing" => {
        val board = (json \ "board")
        Games.switchPlayerState(uuidGame, numPlayer, "endEditing")
        Games.addPlayerBoard(uuidGame, numPlayer, board)
        if(Games.gameCanRun(uuidGame)) {
          val newGame = Games.games.get(uuidGame).get
          game.channelClient.push(
              Json.obj(
                  "cmd" -> "endEditing", 
                  "boardP1" -> newGame.player1.board.get,
                  "boardP2" -> newGame.player2.board.get))
        }
      }
      case "startEditing" => {
        Games.switchPlayerState(uuidGame, numPlayer, "startEditing")
        if(Games.gameCanRun(uuidGame)) {
          game.channelClient.push(Json.obj("cmd" -> "startEditing", "idGame" -> uuidGame))
        }
      }
      case _ => game.channelClient.push(Json.obj("error" -> "cmd not found"))
    }
  }
  
  def startGame(uuidGame:String, game:Game) = {
    game.channelClient.push(Json.obj("cmd" -> "startEditing", "idGame" -> uuidGame))
  }
  
  def sendYouAreFirstPlayer(game:Game) = {
    game.channelClient.push(Json.obj("cmd" -> "youAreFirst"))
  }
  
}