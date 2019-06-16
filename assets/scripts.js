var CLIENT_ID = "70054873586-honfn6r010f3us8u3788tdiqa367k9fa.apps.googleusercontent.com";
var API_KEY = "AIzaSyBNNjv94fxFRt7rViAuhrd7qQ9dPOpQYj4";
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
var SPREADSHEET_ID = "1EnHIFnzv-ydeVJVK28VFci7IqDgG-wVKc0bGI0g3FL0";

var rhizotron = document.querySelector("#rhizotron");

function loadMedia(media) {
	var url = media[0];
	var date = new Date(media[1]);
	var img = document.createElement("img");
	img.onload = function(e) {
		rhizotron.style.backgroundImage = "url("+url+")";

		var timestamp = document.createElement("div");
		timestamp.classList.add("timestamp");
		console.log(date);
		timestamp.innerHTML = date;
		rhizotron.append(timestamp);		
	}
	img.onerror = function(e) {
		console.warn(e);
	}
	img.src = url;
}

function getData() {
	var range = "Images!A1:B5000";
	var params = {
		spreadsheetId: SPREADSHEET_ID,
		range: range,
		majorDimension: "ROWS"
	};
	var request = gapi.client.sheets.spreadsheets.values.get(params);
	request.then(function(response) {
		var values = response.result.values;
		values.shift();
		var media = values[values.length-1];
		loadMedia(media);
	}, function(reason) {
		console.error("error: " + reason.result.error.message);
	});
}

function initClient() {
	gapi.client.init({
		"apiKey": API_KEY,
		"clientId": CLIENT_ID,
		"scope": SCOPE,
		"discoveryDocs": ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
	}).then(function() {
		getData();
	});
}

function handleClientLoad() {
	gapi.load("client:auth2", initClient);
}