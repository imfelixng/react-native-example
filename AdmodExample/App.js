import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import firebase from "react-native-firebase";

const App = () => {
  //firebase.admob().initialize('ca-app-pub-6590896323514966~1110323651')
  const Banner = firebase.admob.Banner;
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();
  request.addKeyword('foobar');
  const unitId =
    Platform.OS === "ios"
      ? "ca-app-pub-6590896323514966/8888084784"
      : "ca-app-pub-6590896323514966/5843775583";
  return (
    <View style={styles.container}>
      <Text>Demo</Text>
        <Banner
          unitId={unitId}
          size={"LARGE_BANNER"}
          request={request.build()}
          onAdLoaded={() => {
            console.log("Advert loaded");
          }}
          onAdFailedToLoad = {() => {
            console.log('Load failed')
          }}
        />
        <Text>Demo1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  banner: {
    width: 300,
    height: 100,
    backgroundColor: "red"
  }
});

export default App;
