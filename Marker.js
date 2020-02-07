import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import DataView from './dataview';

export default CMarker = ({mLat, mLong, data}) => {
  let mref = null;

  function updateRef(ref) {
    mref = ref;
  }

  useEffect(() => {
    if (mref) {
      mref.showCallout();
    }
  });

  return (
    <Marker
      ref={updateRef}
      coordinate={{
        latitude: mLat,
        longitude: mLong,
      }}>
      <View>
        <Text> </Text>
      </View>
      <Callout style={styles.data}>
        <DataView data={data}></DataView>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  data: {
    width: 300,
    height: 200,
  },
});
