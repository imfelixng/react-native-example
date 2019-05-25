import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import GoogleAutoInput from './components/GoogleAutoInput';
import MapPlace from './components/MapPlace';

const App = () => {

  const [geo, setGeo] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const onChooseLocation = (geo) => {
    setGeo(geo);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoogleAutoInput 
        onChooseLocation = { onChooseLocation }
      />
      <MapPlace 
        geo = {geo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default App;
