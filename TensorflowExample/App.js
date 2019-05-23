import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Tflite from "tflite-react-native";
import ImagePicker from "react-native-image-picker";

let tflite = new Tflite();

const height = 350;
const width = Dimensions.get('window').width;
const blue = "#ff0000";
const mobile = "MobileNet";
const ssd = "SSD MobileNet";
const yolo = "Tiny YOLOv2";

const App = () => {
  const [model, setModel] = React.useState(null);
  const [source, setSource] = React.useState(null);
  const [recognitions, setRecognitions] = React.useState(null);
  const [imageDimen, setImageDimen] = React.useState({
    imageHeight: height,
    imageWidth: width
  });

  const onSelectModel = model => {
    setModel(model);
    let modelFile = '';
    let labelsFile = '';
    switch (model) {
      case ssd:
        modelFile = "models/ssd_mobilenet.tflite";
        labelsFile = "models/ssd_mobilenet.txt";
        break;
      case yolo:
        modelFile = "models/yolov2_tiny.tflite";
        labelsFile = "models/yolov2_tiny.txt";
        break;
      default:
        modelFile = "models/mobilenet_v1_1.0_224.tflite";
        labelsFile = "models/mobilenet_v1_1.0_224.txt";
    }
    tflite.loadModel(
      {
        model: modelFile,
        labels: labelsFile
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      }
    );
  };

  const onSelectImage = () => {
    const options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        var path =
          Platform.OS === "ios" ? response.uri : "file://" + response.path;
        var w = response.width;
        var h = response.height;
        setSource({ uri: path });
        setImageDimen({ imageHeight: (h * width) / w, imageWidth: width });

        switch (model) {
          case ssd:
            tflite.detectObjectOnImage(
              {
                path,
                threshold: 0.2,
                numResultsPerClass: 1
              },
              (err, res) => {
                if (err) console.log(err);
                else setRecognitions(res);
              }
            );
            break;
          case yolo:
            tflite.detectObjectOnImage(
              {
                path,
                model: "YOLO",
                imageMean: 0.0,
                imageStd: 255.0,
                threshold: 0.4,
                numResultsPerClass: 1
              },
              (err, res) => {
                if (err) console.log(err);
                else setRecognitions(res);
              }
            );
            break;
          default:
            tflite.runModelOnImage(
              {
                path,
                imageMean: 128.0,
                imageStd: 128.0,
                numResults: 3,
                threshold: 0.05
              },
              (err, res) => {
                if (err) console.log(err);
                else setRecognitions(res);
              }
            );
        }
      }
    });
  };

  const renderBoxes = () => {
    const { imageHeight, imageWidth } = imageDimen;
    if (model === mobile)
      return recognitions && recognitions.map((res, id) => {
        return (
          <Text key={id} style={{ color: "black" }}>
            {res["label"] + "-" + (res["confidence"] * 100).toFixed(0) + "%"}
          </Text>
        );
      });
    else
      return recognitions && recognitions.map((res, id) => {
        var left = res["rect"]["x"] * imageWidth;
        var top = res["rect"]["y"] * imageHeight;
        var width = res["rect"]["w"] * imageWidth;
        var height = res["rect"]["h"] * imageHeight;
        return (
          <View key={id} style={[styles.box, { top, left, width, height }]}>
            <Text style={{ color: "white", backgroundColor: blue }}>
              {res["detectedClass"] +
                " " +
                (res["confidenceInClass"] * 100).toFixed(0) +
                "%"}
            </Text>
          </View>
        );
      });
  };

  const renderButton = m => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onSelectModel(m)}>
        <Text style={styles.buttonText}>{m}</Text>
      </TouchableOpacity>
    );
  };

  const { imageHeight, imageWidth } = imageDimen;

  return (
    <View style={styles.container}>
      {model ? (
        <TouchableOpacity
          style={[
            styles.imageContainer,
            {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2
            }
          ]}
          onPress={onSelectImage}
        >
          {source ? (
            <Image
              source={source}
              style={{
                height: imageHeight,
                width: imageWidth
              }}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.text}>Select Picture</Text>
          )}
          <View style={styles.boxes}>{renderBoxes()}</View>
        </TouchableOpacity>
      ) : (
        <View>
          {renderButton(mobile)}
          {renderButton(ssd)}
          {renderButton(yolo)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: "center"
  },
  text: {
    color: blue
  },
  button: {
    width: 200,
    backgroundColor: blue,
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontSize: 15
  },
  box: {
    position: "absolute",
    borderColor: blue,
    borderWidth: 2
  },
  boxes: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

export default App;
