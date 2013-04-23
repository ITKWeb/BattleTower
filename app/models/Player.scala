package models

import play.api.libs.json.JsValue
import play.api.libs.json.Json
import play.api.libs.iteratee.Concurrent.Channel

case class Player(
    num: Int,
    channelClient: Channel[JsValue],
    board: Option[JsValue] = None,
    state: String = ""
)

object Player {
  
  def getFirstPlayer(channelClient: Channel[JsValue]):Player = {
    Player(1, channelClient, None, "")
  }
  
  def getSecondPlayer(channelClient: Channel[JsValue]):Player = {
    Player(2, channelClient, None, "")
  }
  
  def changeState(player:Player, state:String):Player = {
    Player(player.num, player.channelClient, player.board, state)
  }
  
  def addBoard(player:Player, board:JsValue):Player = {
    Player(player.num, player.channelClient, Some(board), player.state)
  } 
}