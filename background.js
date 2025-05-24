
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://") || tab.url.startsWith("file://"))) {
    try {
      console.log(`[BG] Injecting content script into tab: ${tab.id}, URL: ${tab.url}`);
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
      console.log("[BG] Content script injected successfully.");
    } catch (err) {
      console.error("[BG] Failed to inject content script:", err, `URL: ${tab.url}`);

      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (errMsg) => alert(`Table Scraper Error: Could not inject script. ${errMsg}`),
          args: [err.message]
        });
      } catch (alertErr) {
        console.error("[BG] Failed to show injection error alert on page:", alertErr);
      }
    }
  } else {
    console.log("[BG] Cannot inject script into this URL (e.g., chrome:// pages or other restricted schemes). URL:", tab.url);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[BG] Message received:", message);

  if (message.action === "downloadCSV" && message.data) {
    const csvContent = message.data;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const reader = new FileReader();


    reader.onload = function() {
      const dataUrl = reader.result;
      let filename = "table_data.csv";
      if (sender.tab && sender.tab.title) {
        filename = sender.tab.title.replace(/[\\/:*?"<>|]/g, '_').replace(/ /g, '_').toLowerCase() + "_table.csv";
        if (filename.length > 100) filename = filename.substring(0, 95) + "_table.csv";
      }
      
      console.log("[BG] Preparing to download:", filename);
      chrome.downloads.download({
        url: dataUrl,
        filename: filename,
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("[BG] Download API failed:", chrome.runtime.lastError.message);
    
        } else if (downloadId === undefined) {
          console.error("[BG] Download did not start (downloadId undefined). URL might be invalid or too long, or other restrictions.");

        } else {
          console.log("[BG] Download initiated with ID:", downloadId);
       
        }
        
      });
    };

    reader.onerror = function() {
      console.error("[BG] FileReader error:", reader.error);
    };

    reader.readAsDataURL(blob);
    

    return true; 
  } else if (message.action === "noTableFound") {
    console.log("[BG] Content script reported: No table found on the page.");
    if (sender.tab && sender.tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: () => { alert("Table Scraper: No <table> element was found on this page."); }
      }).catch(err => console.error("[BG] Failed to show 'no table' alert:", err));
    }
 
  } else if (message.action === "contentScriptReady") {
    console.log(`[BG] Content script ready on tab: ${sender.tab ? sender.tab.id : 'unknown tab'}`);
   
  }

});


chrome.runtime.onInstalled.addListener(() => {
  console.log('[BG] Table to CSV Scraper extension installed/updated.');
});