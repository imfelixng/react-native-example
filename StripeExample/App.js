import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import stripe from "tipsi-stripe";

stripe.setOptions({
  publishableKey: "pk_test_5GQiqPEad7kBv0pjX8QyWISZ",
  androidPayMode: "test", // Android only
  merchantId: "MERCHANT_ID" // Omit this line in sandbox; insert your Google merchant ID in production
});

const App = () => {
  const onPressStripe = async () => {
    const token = await stripe.paymentRequestWithCardForm({
      // Only iOS support this options
      smsAutofillDisabled: true,
      requiredBillingAddressFields: "full",
      prefilledInformation: {
        billingAddress: {
          name: "Gunilla Haugeh",
          line1: "Canary Place",
          line2: "3",
          city: "Macon",
          state: "Georgia",
          country: "US",
          postalCode: "31217",
          email: "ghaugeh0@printfriendly.com"
        }
      }
    });
    console.log(token);
    alert(token);
  };

  const onPressGPay = async () => {
    let allowed = null;
    try {
      allowed = await stripe.deviceSupportsAndroidPay();
    } catch (error) {
      console.log(error);
      allowed = null;
    }
    
    if (allowed) {
      const token = await stripe.paymentRequestWithNativePay({
        total_price: "80.00",
        currency_code: "USD",
        shipping_address_required: false,
        billing_address_required: true,
        shipping_countries: ["US", "CA"],
        line_items: [
          {
            currency_code: "USD",
            description: "Whisky",
            total_price: "50.00",
            unit_price: "50.00",
            quantity: "1"
          },
          {
            currency_code: "USD",
            description: "Vine",
            total_price: "30.00",
            unit_price: "30.00",
            quantity: "1"
          }
        ]
      });
      console.log(token);
      
    } else {
      alert("Your phone don't support Google Pay");
    }
  };

  const onPressAPay = async () => {
    let allowed = null;
    try {
      allowed = await stripe.deviceSupportsApplePay();
    } catch (error) {
      console.log(error);
      allowed = null;
    }
    console.log('support');
    if (allowed) {
      const token = await stripe.paymentRequestWithNativePay(
        {
          shippingMethods: [
            {
              id: "fedex",
              label: "FedEX",
              detail: "Test @ 10",
              amount: "10.00"
            }
          ]
        },
        [
          {
            label: "Whisky",
            amount: "50.00"
          },
          {
            label: "Vine",
            amount: "60.00"
          },
          {
            label: "Tipsi",
            amount: "110.00"
          }
        ]
      );
      stripe.completeApplePayRequest()
      console.log(token);
    } else {
      alert('Your phone dont support Apple Pay')
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressStripe}>
        <Text>Pay with stripe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressGPay}>
        <Text>Pay with GPay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressAPay}>
        <Text>Pay with APay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff0",
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10
  }
});

export default App;
