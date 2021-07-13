/*global browser */



function pingIt(tabId, frameId){
	browser.tabs.sendMessage(tabId, {
		"action": "ping"
	}, {
		frameId: frameId
	}).then(msg=>{
		if(msg.action === "pong"){
			console.log("PONG");
			window.setTimeout(()=>{
				pingIt(tabId, frameId);
			}, Math.ceil(5000 * Math.random()));
		}
	});
}

browser.browserAction.onClicked.addListener(() => {
	var aTab;
	browser.tabs.create({
		url: "https://www.aeroclubofindia.com/contact.html"
	}).then(function(_aTab) {
		aTab = _aTab;
		browser.webNavigation.onCompleted.addListener((details) => {
			if (details.tabId === aTab.id) {
				browser.webNavigation.getAllFrames({
					tabId: aTab.id
				}).then((frArr) => {
					frArr.forEach(frObj => {
						pingIt(aTab.id, frObj.frameId);
					});
				});
			}
		});
	});
});
