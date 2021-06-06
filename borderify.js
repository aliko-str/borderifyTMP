/*eslint-env browser*/
/*global browser*/


/*
Just draw a border round the document.body.
*/

browser.runtime.onMessage.addListener((msg)=>{
	if(msg.action === "blueIt"){
		document.body.style.border = "5px dashed blue";
		
		console.log("[CS] Hello from", window.location.href);
		return Promise.resolve(msg);
	}
});



