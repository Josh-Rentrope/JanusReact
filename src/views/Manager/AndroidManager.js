import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import ReactTable from 'react-table';

import 'react-table/react-table.css'
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table, 
} from 'reactstrap';
import Widget03 from '../../views/Widgets/Widget03';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import { Link } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';

const electron = window.require('electron');



const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};


class NodeInfo extends React.Component {
  constructor(props) {
    super(props);
	this.props = props;
	  
    this.changeEnabled = this.changeEnabled.bind(this);
    this.changeCamera = this.changeCamera.bind(this);
    this.changeMotion = this.changeMotion.bind(this);
    this.changeSound = this.changeSound.bind(this);
    this.state = {
      peer: props.peer,
	  time : null,
	  Enabled: false,
	  CameraEnabled: true,
	  MotionEnabled: true,
	  SoundEnabled: true,
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
	  
  }
  changeEnabled(){
	  axios.get('http://'+electron.remote.peermap[this.props.peer.name].info.addresses[0]+':7995/?action=SetProperty&property=Enabled&value='+!this.state.Enabled,).then((data)=>{
					  //electron.remote.peermap[Name].data = data.data
		  //console.log(data.data)
		  this.setState({ Enabled: data.data.Status });
	  }); 
  }
  changeCamera(){
	  axios.get('http://'+electron.remote.peermap[this.props.peer.name].info.addresses[0]+':7995/?action=SetProperty&property=CameraEnabled&value='+!this.state.CameraEnabled,).then((data)=>{
					  //electron.remote.peermap[Name].data = data.data
		  //console.log(data.data)
		  this.setState({ CameraEnabled: data.data.Status });
	  }); 
  }
  changeMotion(){
	  axios.get('http://'+electron.remote.peermap[this.props.peer.name].info.addresses[0]+':7995/?action=SetProperty&property=MotionEnabled&value='+!this.state.CameraEnabled,).then((data)=>{
					  //electron.remote.peermap[Name].data = data.data
		  //console.log(data.data)
		  this.setState({ MotionEnabled: data.data.Status });
	  }); 
  }
  changeSound(){
	  axios.get('http://'+electron.remote.peermap[this.props.peer.name].info.addresses[0]+':7995/?action=SetProperty&property=SoundEnabled&value='+!this.state.CameraEnabled,).then((data)=>{
					  //electron.remote.peermap[Name].data = data.data
		  //console.log(data.data)
		  this.setState({ SoundEnabled: data.data.Status });
	  }); 
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
	  //let writeable = electron.remote.peermap[this.props.peer.name] && electron.remote.peermap[this.props.peer.name].data && electron.remote.peermap[this.props.peer.name].data.Data;
    this.setState({
		
      dropdownOpen: false,
      time: new Date().toLocaleString()
	  /*MotionEnabled:(writeable?electron.remote.peermap[this.props.peer.name].data.Data.Configuration.Acceleration:false),
	  CameraEnabled:(writeable?electron.remote.peermap[this.props.peer.name].data.Data.Configuration.Camera:false),
	  SoundEnabled:(writeable?electron.remote.peermap[this.props.peer.name].data.Data.Configuration.Sound:false)*/
    });
  }
	
  getNodeType(){
	  if (this.state.peer.name.includes("React")){
		  return "React";
	  }
	  if (this.state.peer.name.includes("Django")){
		  return "Django";
	  }
	  if (this.state.peer.name.includes("Android")){
		  return "Android";
	  }
	  return "Custon";
		 
  }
	
  renderControls(){
	let retDict = [];
	if(electron.remote.peermap[this.props.peer.name] && electron.remote.peermap[this.props.peer.name].data && electron.remote.peermap[this.props.peer.name].data.Data){
			//console.log(electron.remote.peermap[this.props.peer.name].data.Data);
			return ( 
			<div>
				<Button color={this.state.Enabled? "primary":"danger"} className="btn btn-primary col-4 m-2" onClick={this.changeEnabled}>Device {this.state.Enabled? "Enabled":"Disabled"}</Button> <br/><br/>
				<Button color={this.state.MotionEnabled? "primary":"danger"} className="btn btn-primary col-4 m-2" onClick={this.changeMotion}>Motion {this.state.MotionEnabled? "Enabled":"Disabled"}</Button> <br/><br/>
				<Button color={this.state.SoundEnabled? "primary":"danger"} className="btn btn-primary col-4 m-2" onClick={this.changeSound}>Sound {this.state.SoundEnabled? "Enabled":"Disabled"}</Button> <br/><br/>
				<Button color={this.state.CameraEnabled? "primary":"danger"} className="btn btn-primary col-4 m-2" onClick={this.changeCamera}>Camera {this.state.CameraEnabled? "Enabled":"Disabled"}</Button> 
			</div>
			);
		}else{
			return ( 
				<h2>Controls still Loading</h2>
			)
		}
	  return retDict;
  }
	
  render() {
	  
    return (
		<div>
			<h2>{this.props.peer.name}</h2><br/>
			<Row>
			  <Col>
				<Card>
				  <CardHeader>
					<h3>Control Panel</h3>
				  </CardHeader>
				  <CardBody>
					{this.renderControls()}
				  </CardBody>
				</Card>
			  </Col>
			</Row>
		</div>
		
	  
    );
  }
}

class ArchiveTable extends Component {
	constructor(props){
		super(props);
		
		this.props = props;
		this.state = {
			data : props.archives
		};
		//console.log(this.state);
	}
	componentDidMount(){
		this.intervalID = setTimeout(()=>{
			this.setState({time:new Date()});
			//console.log(this.state);
		},10000);
	}
	
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	render() {
		
		const columns = [{
			Header: 'Name',
			accessor: 'name' // String-based value accessors!
		  }, {
			Header: 'View',
			accessor: 'name',
			Cell: props => (
			  <Link to={{ pathname: '/Manager/Incident', state: {peerinfo: electron.remote.peermap[this.props.peer.name], name:props.value} }}>
						 <Button type="button" className="btn btn-outline-primary" title="Go to Details">Inspect {props.value}</Button>
				</Link> // Custom cell components!
				)
		  }];
		//console.log(this.props.peer.name);
		if(electron.remote.peermap[this.props.peer.name] && electron.remote.peermap[this.props.peer.name].data && electron.remote.peermap[this.props.peer.name].data.Data){
			
			return ( 
			<div>
				<h2>Incident List</h2>
				 <ReactTable
					data={electron.remote.peermap[this.props.peer.name].data.Data.Archives}
					
					columns={columns}
				/> 
			</div>
			);
		}else{
			return ( 
				
			<div>
				<h2>No Incidents Recorded</h2>
				 <ReactTable
					data={[]}
					columns={columns}
				/> 
			</div>
			);
		}
	}

}

class AndroidManager extends Component {
	
  constructor(props) {
    super(props);
	//console.log(electron);
    //this.toggle = this.toggle.bind(this);
    
    //this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
	this.props = props;
	this.state = {};
  }
	
  componentDidMount() {
    //console.log(this.props);
	if(this.props.location.state){
		//peer object passed
		console.log(this.props.location.state);
    	this.setState(
			this.props.location.state
		);
		
		//console.log(this.state);
	}
	  
	 
  }
  GetRenderableData(){
	  if(this.props.location.state){
		  return(<div>
		  <NodeInfo peer={this.props.location.state}></NodeInfo>
			<ArchiveTable peer={this.props.location.state} archives={this.state.Data}></ArchiveTable>
				 </div>
		  );
	  }
		
  }

  render() {
	//console.log(this.state.electron);
    return (
      <div className="animated fadeIn"> 
		{this.GetRenderableData()}
      </div>
    );
  }
}

export default AndroidManager;