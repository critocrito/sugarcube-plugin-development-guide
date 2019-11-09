const plugin = (envelope, {log}) => {
  log.info("Hello World");

  return envelope;
};

plugin.argv = {};
plugin.desc = "The 'Hello World' of Sugarcube.";

module.exports = plugin;
