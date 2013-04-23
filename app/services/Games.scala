package services

import models._
import play.api.libs.json.JsValue
import play.api.libs.iteratee.Iteratee
import play.api.libs.iteratee.Enumerator
import play.api.libs.iteratee.Concurrent.Channel
import play.api.libs.iteratee.Concurrent
import scala.collection.mutable.HashMap
import java.util.UUID
import play.api.Logger
import play.libs.Akka
import scala.concurrent.duration.DurationInt
import play.api.libs.concurrent.Execution.Implicits.defaultContext

object Games {
  
  val games = HashMap[String, Game]()
  var gameWaiting: Option[WaintignGame] = None
  
  def addPlayer() = {
    val (out, channelClient) = Concurrent.broadcast[JsValue]
    val in = Iteratee.foreach[JsValue] { json => 
		InterpretCmd(json, channelClient) 
    }
    if(gameWaiting.isDefined) {
      val oldGame = gameWaiting.get
      val newGame = Game(oldGame.player1, Player.getSecondPlayer(channelClient))
      val uuidGame = UUID.randomUUID().toString
      games.put(uuidGame, newGame)
      InterpretCmd.sendYouAreFirstPlayer(newGame);//only first player listen webSocket at this moment
      gameWaiting = None
      Akka.system.scheduler.scheduleOnce(1 second) {
        InterpretCmd.startGame(uuidGame, newGame);
      }
    } else {
      gameWaiting = Some(WaintignGame(Player.getFirstPlayer(channelClient), (in, out), channelClient))
    }
    (in, out)
  }
  
  def switchPlayerState(uuidGame:String, numPlayer:Int, state:String) = {
    games.get(uuidGame).map{ oldGame => 
      numPlayer match {
        case 1 => games.put(uuidGame, Game(Player.changeState(oldGame.player1, state), oldGame.player2))
        case _ => games.put(uuidGame, Game(oldGame.player1, Player.changeState(oldGame.player2, state)))
      }
    }.getOrElse(Logger(Games.getClass).error("Game with uuid "+uuidGame+" doesn't exist"))
  }
  
  def addPlayerBoard(uuidGame:String, numPlayer:Int, board:JsValue) = {
    games.get(uuidGame).map{ oldGame => 
      numPlayer match {
        case 1 => games.put(uuidGame, Game(Player.addBoard(oldGame.player1, board), oldGame.player2))
        case _ => games.put(uuidGame, Game(oldGame.player1, Player.addBoard(oldGame.player2, board)))
      }
    }.getOrElse(Logger(Games.getClass).error("Game with uuid "+uuidGame+" doesn't exist"))
  }
  
  def gameCanRun(uuidGame:String):Boolean = {
    games.get(uuidGame).map{ game => 
      game.player1.state == "endEditing" && game.player2.state == "endEditing"
    }.getOrElse {
      Logger(Games.getClass).error("Game with uuid "+uuidGame+" doesn't exist")
      false
    }
  }
  
}