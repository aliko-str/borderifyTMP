/*eslint-env browser*/
/*global browser*/

browser.runtime.onMessage.addListener((msg)=>{
	if(msg.action === "ping"){
		console.log("PING", location.origin);
		return new Promise(function(resolve, reject) {
			window.setTimeout(()=>{
				resolve({action: "pong"});
			}, Math.ceil(5000 * Math.random()));
		});
	}
});


