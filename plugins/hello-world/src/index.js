async function init() {
  console.log("Hello World Plugin initialized");
}

async function run(eventData) {
  console.log("Hello World Plugin executed with event data:", eventData);
}

async function terminate() {
  console.log("Hello World Plugin terminated");
}

module.exports = { init, run, terminate };
