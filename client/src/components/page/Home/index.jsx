/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';

import api from '../../../api';

const kyotoLocation = { lat: 35.02107, lng: 135.75385 };

function markerData(eventInfo) {
  const title = eventInfo.title || 'no title';
  const position = { lat: Number(eventInfo.lat) || 0, lng: Number(eventInfo.lon) || 0 };
  return {
    title,
    position
  };
}

const GettingStartedGoogleMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={11}
      defaultCenter={props.defaultCenter}
    >
      {
        props.eventInfo.map((eventInfo, i) => (
          <Marker
            { ...eventInfo }
            key={i}
          />
        ))
      }
      <Marker
        { ...props.userInfo }
        title="me"
      />
    </GoogleMap>
  );
});


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: kyotoLocation,
      eventInfo: [],
      userInfo: {
        position: {
          name: '',
          lat: 0,
          lng: 0
        },
      },
      markers: [],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getDataSucceedHoc = this.getDataSucceedHoc.bind(this);
  }

  componentDidMount() {
    this.getUserLocation()
      .then(this.getUserNearEvents)
      .then((res) => {
        const eventInfo = res.data.events;
        this.setState({ eventInfo })
      });
  }

  getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        this.getDataSucceedHoc(resolve),
        this.getDataFail
      );
    });
  }

  getDataSucceedHoc(next) {
    return (data) => {
      const { latitude, longitude } = data.coords;
      this.setState({
        userInfo: {
          position: {
            lat: latitude,
            lng: longitude
          },
          key: `My place`,
          defaultAnimation: 2,
        }
      }, next({ lat: latitude, lng: longitude }));
    }
  }

  getDataFail() {
    console.error('fail');
  }

  getUserNearEvents(location) {
    return api.getNearEvents(location)
      .then((res) => res);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    const { userInfo, defaultCenter } = this.state;
    const eventInfo = this.state.eventInfo.map(markerData);
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
        <h1>Near me</h1>
        <p>It is IT events near you!</p>
        <div style={{ width: '50%', height: '50%' }}>
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad}
            eventInfo={eventInfo}
            userInfo={userInfo}
            defaultCenter={defaultCenter}
          />
        </div>
      </div>     
    );
  }
}