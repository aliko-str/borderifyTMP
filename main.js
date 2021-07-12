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
			}, Math.ceil(3000 * Math.random()));
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
			if (details.tabId === aTab.id) { // && details.frameId === 0
				browser.webNavigation.getAllFrames({
					tabId: aTab.id
				}).then((frArr) => {
					frArr.forEach(frObj => {
						if (frObj.frameId) {
							console.log("[BG] tabId:", aTab.id, ", frameId:", frObj.frameId, ", frameUrl:", frObj.url);
							console.count("[BG] All frame count");
							browser.tabs.sendMessage(aTab.id, {
								"action": "blueIt"
							}, {
								frameId: frObj.frameId
							}).then((msg) => {
								if(msg && msg.action === "blueIt"){
									console.count("[BG] Responding frame count");
								}
							});
							pingIt(aTab.id, frObj.frameId);
						}
					});
				});
			}
		});
	});
});
