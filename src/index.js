import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Anymesh from 'anymesh';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const AnyMesh = electron.remote.require('../node_modules/anymesh/lib/AnyMesh');
//console.log(anyMesh);
console.log(electron);
if(electron.remote.MeshObject == null){
	let anyMesh = new AnyMesh();
	anyMesh.received = function(message) { 
	  //message is object containing message info
	  //including type, sender, target, and data
	  console.log("message sent by " + message.sender);
	  console.log(message.data);
	}
	anyMesh.connectedTo = function(info) {
		console.log('Connected to ' + info.name);
	}
	anyMesh.disconnectedFrom = function(name) {
		console.log('Disconnected from ' + name);
	}
	//anyMesh.stop();
	anyMesh.publish("updates", {"update":"new headlines!", "content":[1, 5, 8]});
	//anyMesh.connect("JanusReact", ["JanusServers","JanusNodes", "JanusUpdate"]);
	electron.remote.MeshObject = anyMesh;
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
