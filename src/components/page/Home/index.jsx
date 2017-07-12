/* global google */
import React, { Component } from 'react';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const kyotoLocation = { lat: 35.02107, lng: 135.75385 };

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={11}
    defaultCenter={kyotoLocation}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 35.02107,
          lng: 135.75385,
        },
        key: `Kyoto`,
        defaultAnimation: 2,
      }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
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
          />
        </div>
      </div>     
    );
  }
}