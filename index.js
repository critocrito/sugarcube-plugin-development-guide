const fetch = require("node-fetch");
const {parseISO} = require("date-fns");
const {envelope: env} = require("@sugarcube/core");

const plugin = (envelope, {log, stats}) => {
  return env.fmapDataAsync(async unit => {
    const {location} = unit;

    if (location != null && location.startsWith("http")) {
      log.info(`Looking up Mementos for ${location}`);

      let resp;
      let data;

      try {
        resp = await fetch(`http://labs.mementoweb.org/timemap/json/${location}`);
      } catch (e) {
        stats.fail({
          term: location,
          reason: e.message,
        });
        return unit;
      }

      try {
        data = await resp.json();
      } catch (e) {
        stats.fail({
          term: location,
          reason: "No Memento found.",
        });
        return unit;
      }

      if (data.mementos == null || data.mementos.length === 0) return unit;

      return unit;
    }

    // We don't do anything if we don't have a web URI.
    return unit;
  }, envelope);
};

plugin.argv = {};
plugin.desc = "Lookup up a Memento datetime.";

module.exports.plugins = {memento_lookup: plugin};
