window = require("jsdom").jsdom().createWindow()
$ = jQuery = require("jquery")
require("mocha")
require("should")
_ = require("underscore")
sinon = require("sinon")
Handlebars = require("handlebars")

if(!global.App){
  global.App = {}
}
