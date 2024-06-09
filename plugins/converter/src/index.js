const axios = require("axios");
const Table = require("cli-table");
const chalk = require("chalk");

const GBP_RATE = process.env.GBP_RATE || 1.38; // Example conversion rate to GBP, can be set via environment variables

// Initialize the plugin
async function init() {
  console.log("Convert Plugin initialized");
}

// Run the plugin logic
async function run(blnk) {
  console.log("Convert Plugin executed with event data:", blnk.connectedUrl);

  const instanceUrl = blnk.connectedUrl;
  const headers = blnk.headers || {};

  try {
    // Fetch balances from the Blnk instance
    const response = await axios.post(
      `${instanceUrl}/search/balances`,
      { q: "*" },
      { headers }
    );

    // Process and display the balances
    if (response.data && response.data.hits && response.data.hits.length > 0) {
      const rows = response.data.hits.map((balance) => {
        const balanceAmount = balance.document.balance || 0;
        const convertedAmount = balanceAmount * GBP_RATE;
        return [
          balance.document.balance_id || "N/A",
          balance.document.currency || "N/A",
          balance.document.balance || 0,
          convertedAmount.toFixed(2), // Converted to GBP
          balance.document.created_at || "N/A",
        ];
      });

      // Create a table to display the balances
      const table = new Table({
        head: [
          "Balance ID",
          "Currency",
          "Balance",
          "Converted to GBP",
          "Created At",
        ],
      });

      rows.forEach((row) => table.push(row));
      console.log(table.toString());
    } else {
      console.log(chalk.yellow("No balances found."));
    }
  } catch (error) {
    console.error(chalk.red(`Error fetching balances: ${error.message}`));
  }
}

// Terminate the plugin
async function terminate() {
  console.log("Convert Plugin terminated");
}

// Subscribe to events
async function subscribe(event) {
  console.log("Event received in ledger: ", event);
}

// Export the plugin functions
module.exports = { init, run, terminate, subscribe };
