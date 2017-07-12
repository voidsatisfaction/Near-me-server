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
      eventInfo: [

      ],
      userInfo: {
        position: {
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
    this.getDataSucceed = this.getDataSucceed.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.getDataSucceed,
      this.getDataFail
    );
  }

  getDataSucceed(data) {
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
    });
  }

  getDataFail() {
    console.error('fail');
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    console.log(api.getCurrentLocationName(kyotoLocation));
    const {
      markers,
      userInfo
    } = this.state;
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