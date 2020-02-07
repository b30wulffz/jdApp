import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

export default DataView = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <Text style={styles.heading}>Banks and ATMs ({data.length})</Text>
      </View>
      <ScrollView bounces={true} style={styles.scroll}>
        {data.map(dt => {
          return (
            <View style={styles.list}>
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
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
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
  scroll: {
    flex: 1,
    width: '100%',
  },
  list: {
    display: 'flex',
    padding: 15,
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
    fontWeight: '800',
  },
  dt: {
    fontSize: 18,
    fontWeight: '600',
  },
});
