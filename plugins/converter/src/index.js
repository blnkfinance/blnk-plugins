const GBP_RATE = 1.38; // Example conversion rate to GBP

async function init() {
  console.log("Convert Plugin initialized");
}

async function run(blnk) {
  console.log("Convert Plugin executed with event data:", blnk.connectedUrl);

  const instanceUrl = blnk.connectedUrl;
  const headers = blnk.headers || {};

  try {
    const response = await axios.post(
      `${instanceUrl}/search/balances`,
      { q: "*" },
      { headers }
    );

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
    console.error(chalk.red(`Error: ${error.message}`));
  }
}

async function terminate() {
  console.log("Convert Plugin terminated");
}

async function subscribe(event) {
  console.log("Something happened in the ledger: ", event);
}

module.exports = { init, run, terminate, subscribe };
