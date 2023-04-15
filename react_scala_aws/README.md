__scala and scala.js__

build.sbt
```
enablePlugins(ScalaJSPlugin)

scalaVersion := "2.13.6"

val akkaVersion = "2.6.17"

libraryDependencies ++= Seq(
  "org.scala-js" %%% "scalajs-dom" % "1.1.0",
  "com.lihaoyi" %%% "scalarx" % "0.4.3",
  "com.typesafe.akka" %% "akka-http" % akkaVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % akkaVersion
)

```
Scala.js
```scala
import org.scalajs.dom
import rx._

object Main {
  def main(args: Array[String]): Unit = {
    val container = dom.document.getElementById("container")
    val message = Var("Hello, World!")
    val input = dom.document.createElement("input")
    input.addEventListener("input", (e: dom.Event) => {
      message() = input.asInstanceOf[dom.HTMLInputElement].value
    })
    container.appendChild(input)
    val output = dom.document.createElement("div")
    container.appendChild(output)
    val subscription = message.foreach(msg => output.innerHTML = msg)
  }
}

```
in server folder
```scala
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.server.Route
import spray.json.DefaultJsonProtocol._

case class Greeting(message: String)

object Greeting {
  implicit val format = jsonFormat1(Greeting.apply)
}

object Main extends App {
  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  val route: Route = {
    (get & path("greeting" / Segment)) { name =>
      val message = s"Hello, $name!"
      complete(Greeting(message))
    }
  }

  Http().bindAndHandle(route, "localhost", 8080)
}

```
run application
```
sbt ~fastOptJS
sbt server/run
```
http://localhost:8080/greeting/Scala

_fredrik (at) conva se_