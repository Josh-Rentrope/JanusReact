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
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          beginAtZero: false,
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

const SoundChartOpts = {
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


class IncidentChart extends React.Component {
  constructor(props) {
    super(props);
	this.props = props;
	this.items = [];
	this.state = {
		Incident: {
			Graphs: null
		},
		activeIndex:0
		
	};
	  
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
	axios.get('http://'+this.props.peerinfo.info.addresses[0]+':7995/?action=GetIncident&incident='+this.props.name,).then((data)=>{
	  
		let Incident = data.data.Data.Incident;
		Incident.Graphs = { 
			"Acceleration":this.GetAccelerationGraphData(Incident.Data.Acceleration),
			"Sound":this.GetSoundGraphData(Incident.Data.Sound),
		}
		
		this.setState({Incident : Incident});
    	console.log(this.state);
	}); 
  }
	
  GetAccelerationGraphData(accelerationArray){
	  let retData : any = [[],[],[]];
	  for ( var i = 0; i < accelerationArray.length; i++ ){
		  retData[0].push(new Date(accelerationArray[i].timestamp).toTimeString().substr(0,8));
		  retData[1].push(accelerationArray[i].variance);
		  retData[2].push(accelerationArray[i].magnitude/9.81);
	  }
	  return retData;
  }
	
  GetSoundGraphData(soundArray){
	  let retData : any = [[],[],[]];
	  for ( var i = 0; i < soundArray.length; i++ ){
		  retData[0].push(new Date(soundArray[i].timestamp).toTimeString().substr(0,8));
		  retData[1].push(soundArray[i].variance);
		  retData[2].push(soundArray[i].value);
	  }
	  return retData;
  }
  componentDidMount() {
    /*this.intervalID = setInterval(
      () => this.tick(),
      1000
    );*/
	  
  }
  componentWillUnmount() {
    //clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
		
      dropdownOpen: false,
      time: new Date().toLocaleString()
    });
  }
	
  getCameraData(){
	  let retArray = [];
	  let cameraRoll = this.state.Incident.Data.Camera;
	  if(cameraRoll != null){
		for( let i = 0; i < cameraRoll.length; i++){
			  retArray.push({
				  src: cameraRoll[i].image,
				  altText: "Image "+ i, 
				  caption: "Image "+ i 
			  });
		  }
	  }
	  this.items = retArray;
	  return retArray;
  }
	
  getPeerData(){
	  let retArray = [];
	  
	  if(this.state.Incident.PeerData){
		  Object.keys(this.state.Incident.PeerData).forEach((key) => {
			let value = this.state.Incident.PeerData[key];
			console.log(value.Data.ID);
			retArray.push(<h3>Related Peer ID: {value.Data.ID}</h3>);
			console.log(value.Data.Current);
			if(!value.Data.Current){
				retArray.push(<p>No related Incident</p>);
			}else{				  
				retArray.push(<p>Related Incident ID: {value.Data.Current.ID}</p>);
			}
		  });
	}
	  
	  return retArray;
  }
	
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
	
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
	
  render() {
	const accelerationChart = {
	  labels: [],
	  datasets: [
		{
		  label: 'Motion Sensor',
		  backgroundColor: hexToRgba(brandInfo, 10),
		  borderColor: brandInfo,
		  pointHoverBackgroundColor: '#fff',
		  borderWidth: 2,
		  data: null,
		}
	  ],
	};
	const soundChart = {
	  labels: [],
	  datasets: [
		{
		  label: 'Sound Sensor',
		  backgroundColor: hexToRgba(brandInfo, 10),
		  borderColor: brandInfo,
		  pointHoverBackgroundColor: '#fff',
		  borderWidth: 2,
		  data: null,
		}
	  ],
	};
	//console.log(this.state);
	if(this.state.Incident.Graphs == null){
		return(<h3>Loading Data</h3>);
	}
	
    accelerationChart.labels = this.state.Incident.Graphs.Acceleration[0];
	accelerationChart.datasets[0].data = this.state.Incident.Graphs.Acceleration[2];
	soundChart.labels = this.state.Incident.Graphs.Sound[0];
	soundChart.datasets[0].data = this.state.Incident.Graphs.Sound[2];
			   
	const slides = this.getCameraData().map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-100" src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });
    return (
		<div>
			
			<h2>Incident "{this.props.name}"</h2>
			<h3>Trigger: {(this.state.Incident? this.state.Incident.Cause: "Unknown")}</h3><br/>
			<Link to={{ pathname: '/Manager/Android', state: this.props.peerinfo.info }}>
						 <Button type="button" className="btn col-12 btn-primary" title="Go to Device">Back to {this.props.peerinfo.info.name}</Button><br/><br/>
			</Link> 
			<br/>
			<Row>
			  <Col>
				<Card>
				  <CardBody>
					<Row>
					  <Col sm="5">
						<CardTitle className="mb-0">Motion Sensor</CardTitle>
						<div className="small text-muted">Acceleration</div>
					  </Col>
					  <Col sm="7" className="d-none d-sm-inline-block">
						<Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
						<ButtonToolbar hidden className="float-right" aria-label="Toolbar with button groups">
						  <ButtonGroup className="mr-3" aria-label="First group">
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
						  </ButtonGroup>
						</ButtonToolbar>
					  </Col>
					</Row>
					<div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
					  <Line data={accelerationChart} options={mainChartOpts} height={300} />
					</div>
				  </CardBody>
				</Card>
				<Card>
				  <CardBody>
					<Row>
					  <Col sm="5">
						<CardTitle className="mb-0">Sound Sensor</CardTitle>
						<div className="small text-muted">Microphone</div>
					  </Col>
					  <Col sm="7" className="d-none d-sm-inline-block">
						<Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
						<ButtonToolbar hidden className="float-right" aria-label="Toolbar with button groups">
						  <ButtonGroup className="mr-3" aria-label="First group">
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
						  </ButtonGroup>
						</ButtonToolbar>
					  </Col>
					</Row>
					<div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
					  <Line data={soundChart} options={SoundChartOpts} height={300} />
					</div>
				  </CardBody>
				</Card>

				<Card>
				  <CardBody>
					<Row>
					  <Col sm="5">
						<CardTitle className="mb-0">Images</CardTitle>
						<div className="small text-muted">Camera</div>
					  </Col>
					  <Col sm="7" className="d-none d-sm-inline-block">
						<Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
						<ButtonToolbar hidden className="float-right" aria-label="Toolbar with button groups">
						  <ButtonGroup className="mr-3" aria-label="First group">
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
							<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
						  </ButtonGroup>
						</ButtonToolbar>
					  </Col>
					</Row>
					<br/> 
					<Col xs="12" >
						<Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
						  <CarouselIndicators items={this.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
						  {slides}
						  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
						  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
						</Carousel>
					  </Col>
				  </CardBody>
				</Card>

				<Card>
				  <CardBody>
					<Row>
					  <Col sm="5">
						<CardTitle className="mb-0">Peer Data</CardTitle>
						<div className="small text-muted">Zeroconf</div>
					  </Col>
					  <Col sm="7" className="d-none d-sm-inline-block"> 
						
					  </Col>
					</Row>
					<br/> 
					<Col xs="12" xl="6">
						{this.getPeerData()}
					  </Col>
				  </CardBody>
				</Card>
			  </Col>
			</Row>
		</div>
		
	  
    );
  }
}


class IncidentInspector extends Component {
	
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
		//console.log(this.props.location.state);
    	this.setState(
			this.props.location.state
		);
		
		//console.log(this.state);
	}
	  
	 
  }
  GetRenderableData(){
	  if(this.props.location.state){
		  return(<div>
		  	<IncidentChart peerinfo={this.props.location.state.peerinfo} name={this.props.location.state.name} />
		  </div>);
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

export default IncidentInspector;