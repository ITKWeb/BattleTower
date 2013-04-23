package models

import play.api.libs.iteratee.Concurrent.Channel
import play.api.libs.iteratee.Enumerator
import play.api.libs.iteratee.Iteratee
import play.api.libs.json.JsValue

case class Game(
  player1: Player, 
  player2: Player
)

case class WaintignGame(
  player1: Player, 
  inOut: (Iteratee[JsValue, _], Enumerator[JsValue]), 
  channelClient: Channel[JsValue]
)