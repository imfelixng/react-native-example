import React from "react";
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { getStatusBarHeight } from 'react-native-status-bar-height';

const MapPlace = ( { geo }) => {
  console.log(geo);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: geo.latitude,
          longitude: geo.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate = {geo}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: getStatusBarHeight() + 44,
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default MapPlace;
