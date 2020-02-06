import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import HomePage from './screens/HomePage';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currLocation: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position.coords);
  //   });
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0,
          longitudeDelta: 0,
        };

        this.setState({currLocation: initialRegion});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    return (
      <View style={styles.mapFrame}>
        {/* <Text>Hello, World!</Text> */}
        <MapView style={styles.map} initialRegion={this.state.currLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapFrame: {
    width: '100%',
    height: '50%',
  },
});

// import React, {Component} from 'react';
// import {Text, StyleSheet} from 'react-native';
// import MapView from 'react-native-maps';
// //import ClusteredMapView from 'react-native-maps-super-cluster';
// // import image from './images/flag-pink.png';

// export default class App extends Component<{}> {
//   render() {
//     const coordinates = [];

//     coordinates.push({
//       key: 0,
//       location: {
//         longitude: -70.23,
//         latitude: -33.23,
//       },
//     });

//     for (let i = 1; i < 100; i++) {
//       const location = {
//         longitude:
//           coordinates[i - 1].location.longitude +
//           Math.random() * (i % 2 === 0 ? -1 : 1),
//         latitude:
//           coordinates[i - 1].location.latitude +
//           Math.random() * (i % 2 === 0 ? -1 : 1),
//       };

//       coordinates.push({key: i, location});
//     }

//     return (
//       <MapView
//         renderMarker={renderMarker}
//         initialRegion={{
//           longitude: -70.23,
//           latitude: -33.23,
//           latitudeDelta: 9.22,
//           longitudeDelta: 4.21,
//         }}
//         style={StyleSheet.absoluteFillObject}>
//         {coordinates.map(({key, location}) => (
//           <MapView.Marker key={key} coordinate={location} />
//         ))}
//       </MapView>
//     );
//   }
// }

// function renderMarker({location}) {
//   return (
//     <MapView.Marker coordinate={location}>
//       <MapView.Callout>
//         <Text>BiG BiG Callout</Text>
//       </MapView.Callout>
//     </MapView.Marker>
//   );
// }
