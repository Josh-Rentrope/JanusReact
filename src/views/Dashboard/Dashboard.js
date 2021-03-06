import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
import { hashHistory } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';


import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const electron = window.require('electron');


const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
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

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

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

const position = [28.0395, -82];
//'../../assets/img/



class NodeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: props.peer,
	  time : null
    };
	this.normalIcon = new L.Icon({});
	this.dangerIcon = new L.Icon({
		iconRetinaUrl: require('../../assets/img/danger-marker-icon.png'),
		iconUrl: require('../../assets/img/danger-marker-icon.png'),
		shadowUrl: require('../../assets/img/danger-marker-shadow.png'),
		className: 'leaflet-div-icon'
	});
  };
  
	
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      5000
    );
  }
	
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  createMarkers = () => {
    let table = [];
	//console.log(normalIcon);
	
    // Outer loop to create parent
	
    for (let i = 0; i < electron.remote.browser.services.length; i++) {
	  let Name = electron.remote.browser.services[i].name;
	  if(electron.remote.browser.services[i].addresses[0]){  //checking for position
	  	//if(electron.remote.peermap[electron.remote.browser.services[i].addresses[0]] == un){
		let newPosition = [(position[0] +i), (position[1]+i)];//
		  //console.log(electron.remote.peermap[Name]);
		if(electron.remote.peermap[Name] && electron.remote.peermap[Name].data && electron.remote.peermap[Name].data.Data && electron.remote.peermap[Name].data.Data.GPS){ // Recursively finding GPS coordinates
			newPosition = [electron.remote.peermap[Name].data.Data.GPS.latitude,electron.remote.peermap[Name].data.Data.GPS.longitude];
		}
		//let iconS = this.normalIcon;
		//if(electron.remote.peermap[Name] && electron.remote.peermap[Name].data && electron.remote.peermap[Name].data.Data && electron.remote.peermap[Name].data.Data.Current){ // Recursively finding GPS coordinates
			//iconS = this.dangerIcon;
		//}
		table.push(<Marker 
				   //icon={iconS} 
				   key={i} 
				   position={newPosition}>
		  <Popup>{Name}</Popup>
		</Marker>);
		//  console.log("Hello");
		// electron.remote.peermap[electron.remote.browser.services[i].addresses[0]] = "New";
		//}
	  }
      //Inner loop to create children
		
      //table.push(<NodeIndex key={this.state.electron.remote.browser.services[i].name} peer={this.state.electron.remote.browser.services[i]}></NodeIndex>);
      //Create the parent and add the children
    }
    return table;
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  render() {
    return (
		<Map center={position} zoom={13} style={{height: '40vh', width:'100%'}}>
		<TileLayer
		  url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
		  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
		/>
		{this.createMarkers()}
		
	  </Map>
    );
  }
}


class NodeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: props.peer,
	  time : null
    };
  }
  componentDidMount() {
    /*this.intervalID = setInterval(
      () => this.tick(),
      1000
    );*/
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
		
      dropdownOpen: false,
      time: new Date().toLocaleString()
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
	  if (this.state.peer.name.includes("Raspberry")){
		  return "Raspberry";
	  }
	  return "Custon";
		 
  }
  render() {
	  
    return (
	  <tr>
		  <td className="text-center">
			  <div className="avatar">
				<img src={'assets/img/nodes/'+this.getNodeType()+'.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
				<span className="avatar-status badge-success"></span>
			  </div>
			</td>
			<td>
			  <div>{this.state.peer.name}</div>
			  <div className="small text-muted">
				
			  </div>
			</td>
			<td className="text-center">
			  <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
			</td>
			<td>
			  <div className="small text-muted">IP Address</div>
			  <strong>{this.state.peer.addresses[0]}</strong>
			</td>
			<td>
			  <Link to={{ pathname: '/Manager/'+this.getNodeType(),
    					  state: this.state.peer }}><Button type="button" className="btn btn-outline-primary"
				title="Go to Details"
				  
				>Inspect</Button></Link>
			</td>
		</tr>
    );
  }
}

class NodeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electron: props.electron,
	  time : null
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => {
		  this.tick();
    	  //this.updateElectron();
			},
      10000
    );
  }
	
  updateElectron(){
	//console.log(electron);
	
  }
	
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  createTable = () => {
    let table = [];

    // Outer loop to create parent
	
    for (let i = 0; i < this.state.electron.remote.browser.services.length; i++) {
      //Inner loop to create children
		
      table.push(<NodeIndex key={this.state.electron.remote.browser.services[i].name} peer={this.state.electron.remote.browser.services[i]}></NodeIndex>);
      //Create the parent and add the children
    }
    return table;
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  render() {
    return (
      <tbody className="NodeTable">
		{this.createTable()}
      </tbody>
    );
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
	//console.log(electron);
    this.toggle = this.toggle.bind(this);
    
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      electron: electron
    };
	  
	 
	  
	
  }

  
	
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {
	console.log(this.state.electron);
    return (
      <div className="animated fadeIn">
		<Row>
			<Col xs="12" className="pb-3">
			  <NodeMap>
			  </NodeMap>
			</Col>
		</Row>
        
        <Row>
          <Col>
            <Card>
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>IP Address</th>
                    <th>Settings</th>
                  </tr>
                  </thead>
				  <NodeTable electron={this.state.electron}></NodeTable>
                </Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
