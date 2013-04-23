package controllers

import play.api.libs.json.JsValue
import play.api.mvc.Action
import play.api.mvc.Controller
import services.Games
import play.api.Logger

object Application extends Controller {

  val log = Logger(Application.getClass())
  
  def connect() = play.api.mvc.WebSocket.using[JsValue] { implicit request =>
	log.info("nbGames : " + Games.games.size)
	Games.addPlayer()
  }
}