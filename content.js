(function() {
  console.log("Content script loaded and running.");

  function tableToCSV() {
    const table = document.querySelector('table');
    if (!table) {
      console.log("No table found on the page.");
      chrome.runtime.sendMessage({ action: "noTableFound" });
      return null;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');

    for (const row of rows) {
      let rowData = [];
      const cells = row.querySelectorAll('th, td'); 
      for (const cell of cells) {
        let cellText = cell.innerText.trim();
        cellText = cellText.replace(/"/g, '""');
        if (cellText.includes(',') || cellText.includes('\n') || cellText.includes('"')) {
          cellText = `"${cellText}"`;
        }
        rowData.push(cellText);
      }
      csv.push(rowData.join(','));
    }
    return csv.join('\n');
  }

  const csvData = tableToCSV();

  if (csvData) {
    console.log("CSV data prepared, sending to background script.");
    chrome.runtime.sendMessage({ action: "downloadCSV", data: csvData });
  }

  if (chrome.runtime && chrome.runtime.sendMessage) {
    console.log("[CS] Content script finished initialization, sending ready message.");
    chrome.runtime.sendMessage({ action: "contentScriptReady" })
      .catch(error => console.warn("[CS] Could not send 'contentScriptReady' message. Background might not be ready yet.", error));
  } else {
    console.warn("[CS] chrome.runtime.sendMessage not available. Script might be in a wrong context or extension is disabled/reloading.");
  }
})();

