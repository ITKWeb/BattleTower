package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json.JsValue
import play.api.libs.iteratee.Iteratee
import play.api.libs.iteratee.Concurrent

object Application extends Controller{
  
    def index = Action {
	  Ok(views.html.index("Your new applAAAAication is ready."))
  }
    
    val (out, channelClient) = Concurrent.broadcast[JsValue]
    
    val in = Iteratee.foreach[JsValue] {E => channelClient.push(E)}
    
  def connect() = play.api.mvc.WebSocket.using[JsValue] { implicit request =>
    
    (in, out)
  }

  
  
}