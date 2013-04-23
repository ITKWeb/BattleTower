package controllers

import play.api.libs.json.JsValue
import play.api.mvc.Action
import play.api.mvc.Controller
import services.Games

object Application extends Controller {

  def connect() = play.api.mvc.WebSocket.using[JsValue] { implicit request =>
      Games.addPlayer()
  }
}