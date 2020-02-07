import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import DataView from './dataview';

export default CMarker = ({mLat, mLong, data, on}) => {
  let mref = null;

  function updateRef(ref) {
    mref = ref;
  }

  useEffect(() => {
    if (mref && data.length > 0) {
      mref.showCallout();
    } else {
      mref.hideCallout();
    }
  });

  return (
    <Marker
      ref={updateRef}
      coordinate={{
        latitude: mLat,
        longitude: mLong,
      }}
      onCalloutPress={on}>
      <View>
        <Text> </Text>
      </View>
      <Callout style={styles.data}>
        <DataView data={data} full={false}></DataView>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  data: {
    width: 350,
  },
});
