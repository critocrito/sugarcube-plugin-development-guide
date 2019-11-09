const helloWorld = require("./plugins/hello");
const timeMap = require("./plugins/timemap");

module.exports.plugins = {
  hello_world: helloWorld,
  memento_timemap: timeMap,
};
