import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter
} from "react-native";

import RNMomosdk from "react-native-momosdk";
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);

const momoInfo = {
  merchantname: "Didauday Shop",
  merchantcode: "DDD01",
  merchantNameLabel: "Nhà cung cấp",
  billdescription: "Tour du lịch Đà Nẵng 3N - 2Đ",
  amount: 50000,
  enviroment: "0"
};

const App = () => {
  React.useEffect(() => {
    EventEmitter.addListener(
      "RCTMoMoNoficationCenterRequestTokenReceived",
      response => {
        try {
          console.log("<MoMoPay>Listen.Event::" + JSON.stringify(response));
          if (response && response.status == 0) {
            let fromapp = response.fromapp;
            let momoToken = response.data;
            let phonenumber = response.phonenumber;
            let message = response.message;
            let orderId = response.refOrderId;
            alert('IOS: ' + message);
          } else {
            let message = response.message;
            alert('IOS: ' + message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
  }, []);

  const momoHandleResponse = async response => {
    try{
      if (response && response.status == 0) {
        let fromapp = response.fromapp;
        let momoToken = response.data;
        let phonenumber = response.phonenumber;
        let message = response.message;
        alert('ANDROID: ' + message);
      } else {
        let message = response.message;
        alert('ANDROID: ' + message);
      }
    }catch(err){
      console.log(err);
    }
  }

  const onPressMomo = async () => {
    let jsonData = {};
    jsonData.enviroment = momoInfo.enviroment; 
    jsonData.action = "gettoken";
    jsonData.merchantname = momoInfo.merchantname;
    jsonData.merchantcode = momoInfo.merchantcode;
    jsonData.merchantnamelabel = momoInfo.merchantNameLabel;
    jsonData.description = momoInfo.billdescription;
    jsonData.amount = 5000;
    jsonData.orderId = "ID20181123192300";
    jsonData.orderLabel = "Ma don hang";
    jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
    console.log("data_request_payment " + JSON.stringify(jsonData));
    if (Platform.OS === 'android'){
      let dataPayment = await RNMomosdk.requestPayment(jsonData);
      momoHandleResponse(dataPayment);
    }else{
      RNMomosdk.requestPayment(jsonData);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Payment App</Text>
      <View style={styles.method}>
        <TouchableHighlight style={styles.button} onPress={onPressMomo}>
          <Text>Momo</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text>Paypal</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text>Stripe</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text>Apple pay</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text>Google pay</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  appName: {
    flex: 1,
    fontSize: 20,
    alignItems: "center"
  },
  method: {
    flex: 3
  },
  button: {
    backgroundColor: "#fff000",
    height: 30,
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  }
});

export default App;
