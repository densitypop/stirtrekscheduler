window = require("jsdom").jsdom().createWindow()
$ = jQuery = require("jquery")
require("mocha")
require("should")
sinon = require("sinon")
Handlebars = require("handlebars")

if(!global.App){
  global.App = {}
}
