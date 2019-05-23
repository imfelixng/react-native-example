import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import firebase from "react-native-firebase";

let interstitial = null;
let rewarded = null;
const interstitialAds = () => {
  interstitial = firebase
    .admob()
    .interstitial("ca-app-pub-3940256099942544/4411468910");

  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  interstitial.loadAd(request.build());
  interstitial.on("onAdLoaded", () => {
    console.log("interstitial ready to show.");
  });
  setTimeout(() => {
    if (interstitial.isLoaded()) {
      interstitial.show();
    }
  }, 3000);
};

const rewardedAds = () => {
  rewarded = firebase
    .admob()
    .rewarded("ca-app-pub-3940256099942544/1712485313");

  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  rewarded.loadAd(request.build());

  rewarded.on("onAdLoaded", () => {
    console.log("rewarded ready to show.");
  });

  rewarded.on("onRewarded", event => {
    console.log(
      "The user watched the entire video and will now be rewarded!",
      event
    );
  });

  setTimeout(() => {
    if (rewarded.isLoaded()) {
      rewarded.show();
    }
  }, 5000);
};

const App = () => {
  const Banner = firebase.admob.Banner;
  const AdRequest = firebase.admob.AdRequest;
  const request = new AdRequest();

  const unitId =
    Platform.OS === "ios"
      ? "ca-app-pub-6590896323514966/1203259789"
      : "ca-app-pub-3940256099942544/6300978111";

  React.useEffect(() => {
    interstitialAds();
    rewardedAds();
  }, []);

  return (
    <View style={styles.container}>
      <Banner
        unitId={unitId}
        size={"SMART_BANNER"}
        request={request.build()}
        onAdLoaded={() => {
          console.log("Advert loaded");
        }}
        onAdFailedToLoad={error => {
          console.error(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default App;
