async function init() {
  console.log("Hello World Plugin initialized");
}

async function run(blnk) {
  console.log(
    "Hello World Plugin executed with event data:",
    blnk.connectedUrl
  );
}

async function terminate() {
  console.log("Hello World Plugin terminated");
}

async function subscribe(event) {
  console.log("Something happened in the ledger: ", event);
}

module.exports = { init, run, terminate,subscribe };
