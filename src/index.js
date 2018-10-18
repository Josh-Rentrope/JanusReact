import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import ZeroConf from 'zeroconf'; 
//import Anymesh from 'anymesh';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const AnyMesh = electron.remote.require('../node_modules/anymesh/lib/AnyMesh');
const Bonjour = electron.remote.require('bonjour');
const ReconnectingWebSocket = electron.remote.require('reconnecting-websocket');
//console.log(anyMesh);
//console.log(electron);
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
	
	if(electron.remote.peers == undefined){
		electron.remote.peers = [];
	}
	if(electron.remote.bonjour == null){
		
		electron.remote.bonjour = Bonjour();
	}
	electron.remote.bonjour.unpublishAll();
	electron.remote.bonjour.publish({ name: 'Janus React Node', type: 'http', port: 7990 });
	electron.remote.browser = electron.remote.bonjour.find({ type: 'http' }, function (service) {
	  //console.log('Found an HTTP server:', service)
		/*
		Service subtypes:
		
		*/
	  
	  electron.remote.peers.push(service);
	});
	setInterval(() => { electron.remote.browser.update() }, 30000);
	
	console.log(electron);
	//zeroconf.publish({ type: 'http', protocol: 'tcp', port: 5000, name: 'Janus React Node', txt: {} });
	
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
