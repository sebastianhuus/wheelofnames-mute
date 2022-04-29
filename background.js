
// This func tells us when we successfully mute the site.
function onUpdated(tab) {
  console.log("Wheel of Names muted!");
}

// This func tells us when we hit an error.
function onError(error) {
  console.log(`Error: ${error}`);
}

// Here we try finding wheelofnames.com and catch exceptions if the tab does not exist.
function updateTab(tabs) {
  try
  {
    var tab = tabs[0];
    let updating = browser.tabs.update(tab.id, {muted: true});
    updating.then(onUpdated, onError);
  }
  catch (error)
  {
    onError(error);
  }
}

// This will get all tabs matching the url
function getWoN()
{
  let querying = browser.tabs.query({currentWindow:true, url:"https://wheelofnames.com/"});
  querying.then(updateTab, onError);
}

// Calls our tab-getter when something happens. 
browser.tabs.onUpdated.addListener(getWoN);
