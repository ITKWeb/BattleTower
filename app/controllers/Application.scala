package controllers

import play.api.libs.functional.syntax._
import play.api.libs.iteratee.Concurrent.Channel
import play.api.libs.iteratee.Concurrent
import play.api.libs.iteratee.Enumerator
import play.api.libs.iteratee.Iteratee
import play.api.libs.json._
import play.api.mvc._
import play.api._
import scala.collection.mutable.HashMap

object Application extends Controller {

  val START_COMMAND = "starGame"

  def index = Action {
    Ok(views.html.index("BattleTower"))
  }

  val waitStartState = "WAIT_START"
  val waitPlayState = "WAIT_PLAY"
  val readyState = "READY_PLAY"

  var games = List[Game]()

  protected val players = new HashMap[String, StatePlayer]

  def connect() = play.api.mvc.WebSocket.using[JsValue] { implicit request =>

    if (!games.isEmpty && games.last.player2.isDefined) {
      val (out, channelClient) = Concurrent.broadcast[JsValue]
      val in = Iteratee.foreach[JsValue] { E => execCmd(channelClient, E, request.remoteAddress) }
      games = games ::: List(Game(request.remoteAddress, (in, out), channelClient))
      println("Add P1 " + request.remoteAddress + " - " + games.length);

      players.put(request.remoteAddress, StatePlayer(waitStartState, 1))

      (in, out)

    } else if (games.isEmpty) {
      val (out, channelClient) = Concurrent.broadcast[JsValue]
      val in = Iteratee.foreach[JsValue] { E => execCmd(channelClient, E, request.remoteAddress) }
      games = games ::: List(Game(request.remoteAddress, (in, out), channelClient))
      // 	   games.(Game(request.remoteAddress,(in, out)))
      println("Add First P1 " + request.remoteAddress + " - " + games.length);

      players.put(request.remoteAddress, StatePlayer(waitStartState, 1))

      (in, out)
    } else {
      val last = games.last;
      
      games = games.dropRight(1)
      games = games ::: List(Game(last.player1, last.inOut, last.channelClient, Some(request.remoteAddress)))
      println("Add P2 " + request.remoteAddress + " - " + games.length)

      players.put(request.remoteAddress, StatePlayer(waitStartState, 2, Some(last.player1)))
      players.put(last.player1, StatePlayer(waitStartState, 1, Some(request.remoteAddress)))
      execCmd(last.channelClient, Json.obj("cmd" -> "starGame"), request.remoteAddress)

       last.inOut
    }

  }

  def execCmd(channelClient: Channel[JsValue], json: JsValue, ip: String) {
    val command = (json \ "cmd").toString()
    command match {
      case "endEditing" => {
        println(command)
        val board = (json \ "board")
        val currentStatePlayer = players.get(ip).get
        val numPlayer = currentStatePlayer.numPlayer
        val ipOtherGamer = currentStatePlayer.otherGamer.get

        if (players.get(ipOtherGamer).get.state.equalsIgnoreCase(readyState)) {
          if (numPlayer == 2) {
            val bigBoard = Json.obj("cmd" -> "play", "boardP1" -> players.get(ipOtherGamer).get.board.get, "boardP2" -> board)
            channelClient.push(bigBoard)
          } else {
            val bigBoard = Json.obj("cmd" -> "play", "boardP1" -> board, "boardP2" -> players.get(ipOtherGamer).get.board.get)
            channelClient.push(bigBoard)
          }
        } else {
          players.put(ip, StatePlayer(readyState, numPlayer, Some(ipOtherGamer), Some(board)))
        }
        
         players.put(ip, StatePlayer(waitPlayState, numPlayer, Some(ipOtherGamer), Some(board)))
      } 
      case _ => {

        channelClient.push(json);
      }
    }
  }

  case class Game(player1: String, inOut: (Iteratee[JsValue, _], Enumerator[JsValue]), channelClient: Channel[JsValue], player2: Option[String] = None)

  case class StatePlayer(state: String, numPlayer: Int, otherGamer: Option[String] = None, board: Option[JsValue] = None)
}