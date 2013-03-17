package models

import play.api.libs.json.JsValue
import play.api.libs.json.Json

case class Player(
    num: Int,
    board: Option[JsValue] = None,
    state: String = ""
)

object Player {
  
  def getFirstPlayer():Player = {
    Player(1, None, "")
  }
  
  def getSecondPlayer():Player = {
    Player(2, None, "")
  }
  
  def changeState(player:Player, state:String):Player = {
    Player(player.num, player.board, state)
  }
  
  def addBoard(player:Player, board:JsValue):Player = {
    Player(player.num, Some(board), player.state)
  } 
  
}