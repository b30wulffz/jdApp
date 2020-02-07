import React from 'react';
import {
  View,
  PermissionsAndroid,
  StyleSheet,
  Text,
  BackHandler,
  CheckBox,
  Modal,
  TouchableHighlight,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CMarker from './Marker';
import DataView from './dataview';

const Data = require('./data.json');

const bankMarker = (data, index) => {
  const {latitude, longitude} = data;
  return (
    <Marker
      coordinate={{latitude, longitude}}
      icon={require('./images/bank.png')}
      key={'bank' + index}></Marker>
  );
};

const atmMarker = (data, index) => {
  const {latitude, longitude} = data;
  return (
    <Marker
      coordinate={{latitude, longitude}}
      icon={require('./images/atm.png')}
      key={'atm' + index}></Marker>
  );
};

function getPgArray(lat, lot, latDel, lotDel) {
  let minLat = lat - latDel * 0.04;
  let maxLat = lat + latDel * 0.04;
  let maxLot = lot + lotDel * 0.06;
  let minLot = lot - lotDel * 0.06;
  let a = [
    {latitude: minLat, longitude: minLot},
    {latitude: minLat, longitude: maxLot},
    {latitude: maxLat, longitude: maxLot},
    {latitude: maxLat, longitude: minLot},
  ];
  return a;
}

function getListArray(atm, bank, lat, lot, latDel, lotDel) {
  let ans = [];
  let minLat = lat - latDel * 0.045;
  let maxLat = lat + latDel * 0.045;
  let maxLot = lot + lotDel * 0.07;
  let minLot = lot - lotDel * 0.07;
  if (atm) {
    for (let i = 0; i < Data.atm.length; i++) {
      if (
        Data.atm[i].latitude >= minLat &&
        Data.atm[i].latitude <= maxLat &&
        Data.atm[i].longitude >= minLot &&
        Data.atm[i].longitude <= maxLot
      ) {
        ans.push(Data.atm[i]);
      }
    }
  }
  if (bank) {
    for (let i = 0; i < Data.bank.length; i++) {
      if (
        Data.bank[i].latitude >= minLat &&
        Data.bank[i].latitude <= maxLat &&
        Data.bank[i].longitude >= minLot &&
        Data.bank[i].longitude <= maxLot
      ) {
        ans.push(Data.bank[i]);
      }
    }
  }
  return ans;
}

export default class App extends React.Component {
  constructor() {
    super();
    this.region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0001922,
      longitudeDelta: 0.0001421,
    };
    this.cref = undefined;
    this.ref = undefined;
    this.state = {
      atm: this.atm,
      banks: this.banks,
      mLat: 37.78825,
      mLong: -122.4324,
      values: [],
      dataVisible: false,
    };
    this.setup = this.setup.bind(this);
    this.updateRef = this.updateRef.bind(this);
    this.setDataModal = this.setDataModal.bind(this);
  }

  setup({nativeEvent: {coordinate}}) {
    let data = getListArray(
      this.state.atm,
      this.state.banks,
      coordinate.latitude,
      coordinate.longitude,
      this.region.latitudeDelta,
      this.region.longitudeDelta,
    );
    this.setState({
      values: data,
      mLat: coordinate.latitude,
      mLong: coordinate.longitude,
    });
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
          BackHandler.exitApp();
          res(false);
        }
      } catch (err) {}
    });
    per.then(is => {
      if (is) {
        Geolocation.getCurrentPosition(
          position => {
            this.ref.animateToRegion(
              {
                ...this.region,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              1000,
            );
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

  updateRef(re) {
    this.cref = re;
  }

  setDataModal() {
    this.setState({dataVisible: !this.state.dataVisible});
  }

  render() {
    return (
      <View style={styles.mapFrame}>
        <MapView
          ref={ref => {
            this.ref = ref;
          }}
          style={styles.map}
          initialRegion={this.region}
          maxZoomLevel={14}
          minZoomLevel={2}
          showsUserLocation={true}
          onRegionChangeComplete={region => {
            this.region = region;
          }}
          onPress={this.setup}
          onMarkerPress={this.setup}>
          {this.state.banks && Data.bank.map(bankMarker)}
          {this.state.atm && Data.atm.map(atmMarker)}
          <CMarker
            mLong={this.state.mLong}
            mLat={this.state.mLat}
            data={this.state.values}
            on={this.setDataModal}></CMarker>
        </MapView>
        <Modal visible={this.state.dataVisible} transparent={true}>
          <View style={styles.modalBack}>
            <DataView data={this.state.values} full={true}></DataView>
            <TouchableHighlight
              onPress={this.setDataModal}
              style={{
                marginTop: 20,
                height: 40,
                width: 70,
                alignSelf: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 20,
                  height: '100%',
                  width: '100%',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                Close
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <View style={styles.check}>
          <View style={styles.checkbox}>
            <CheckBox
              onValueChange={val => {
                this.setState({atm: val});
              }}
              value={this.state.atm}></CheckBox>
            <Text style={styles.checkText}>ATMs</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox
              onValueChange={val => {
                this.setState({banks: val});
              }}
              value={this.state.banks}></CheckBox>
            <Text style={styles.checkText}>Banks</Text>
          </View>
        </View>
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
  check: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: 'auto',
    width: 140,
    backgroundColor: '#000080',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  checkbox: {
    marginVertical: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalBack: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});
