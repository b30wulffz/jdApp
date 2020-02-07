import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

export default DataView = ({data, full}) => {
  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.heading}>Banks and ATMs ({data.length})</Text>
      </View>
      {data.map((dt, index) => {
        return full ? (
          <View style={styles.list} key={index}>
            <View style={styles.single}>
              <Text style={styles.tag}>{dt.name}</Text>
            </View>
            <View style={styles.single}>
              <Text style={styles.tag}>Address:</Text>
              <Text style={styles.dt}>{dt.address}</Text>
            </View>
            <View style={styles.single}>
              <Text style={styles.tag}>Timings:</Text>
              <Text style={styles.dt}>{dt.timings}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.list} key={index}>
            <View style={styles.single}>
              <Text style={styles.tag}>{dt.name}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  strip: {
    width: '100%',
    backgroundColor: '#000080',
    elevation: 3,
  },
  heading: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  list: {
    display: 'flex',
    padding: 5,
  },
  single: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#2a2a2a',
    borderBottomWidth: 1,
  },
  tag: {
    fontSize: 20,
  },
  dt: {
    fontSize: 18,
  },
});
