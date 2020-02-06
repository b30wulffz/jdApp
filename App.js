import React from 'react';
import {View, PermissionsAndroid, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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

  componentDidMount() {
    let per = new Promise(async res => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          res(true);
        } else {
          alert('Permission Denied');
          res(false);
        }
      } catch (err) {}
    });
    per.then(is => {
      if (is) {
        console.log('hello');
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            this.setState({
              currLocation: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
            });
          },
          () => {},
          {
            enableHighAccuracy: true,
            timeout: 600000,
            maximumAge: 60000,
            forceRequestLocation: true,
          },
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.mapFrame}>
        <MapView
          style={styles.map}
          region={this.state.currLocation}
          showsCompass
          showsUserLocation
        />
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
    height: '100%',
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
