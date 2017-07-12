/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';

import api from '../../../api';

const kyotoLocation = { lat: 35.02107, lng: 135.75385 };

const GettingStartedGoogleMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={11}
      defaultCenter={kyotoLocation}
    >
      {
        props.markers.map((marker) => (
          <Marker
            { ...marker }
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
      eventInfo: [],
      userInfo: {
        position: {
          name: '',
          lat: 0,
          long: 0
        },
      },
      markers: [{
        position: {
          lat: 35.02107,
          lng: 135.75385,
        },
        key: `My place`,
        defaultAnimation: 2,
      }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.getDataSucceedHoc = this.getDataSucceedHoc.bind(this);
  }

  componentDidMount() {
    this.getUserLocation()
      .then(this.getUserLocationName)
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

  getUserLocationName(location) {
    return api.getCurrentLocationName(location)
      .then((res) => res.data.ResultSet.Address[0]);
  }

  getUserNearEvents(name) {
    return api.getNearEvents(name)
      .then((res) => res);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    console.log(this.state);
    const { markers, userInfo } = this.state;
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
        <h1>This is home</h1>
        <p>Hello home!</p>
        <div style={{ width: '50%', height: '50%' }}>
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad}
            markers={this.state.markers}
            userInfo={userInfo}
          />
        </div>
      </div>     
    );
  }
}