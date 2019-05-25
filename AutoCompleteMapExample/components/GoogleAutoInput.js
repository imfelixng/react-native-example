import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleAutoInput = props => {
  return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={1}
        autoFocus={false}
        returnKeyType={"search"}
        keyboardAppearance={"light"}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          const geo = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          }
          props.onChooseLocation(geo);
        }}
        query={{
          key: "AIzaSyAMz1rZwha7UV3-FOzksnI6_EZcfCeJVU4",
          language: "vi"
        }}
        styles={
          {
            textInputContainer: {
              width: "100%",
            },
            description: {
              fontWeight: "bold"
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            },
          }
        }
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      />
  );
};

export default GoogleAutoInput;
