import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import stripe from "tipsi-stripe";
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';

stripe.setOptions({
  publishableKey: "pk_test_5GQiqPEad7kBv0pjX8QyWISZ",
  androidPayMode: "test", // Android only
  merchantId: "MERCHANT_ID" // Omit this line in sandbox; insert your Google merchant ID in production
});

const App = () => {

  const onPressPayPal = () => {
    BraintreeDropIn.show({
      clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSjkuZXlKbGVIQWlPakUxTlRnNE9URXlPRGtzSW1wMGFTSTZJalU1WWpFNE9UVmtMVEE0TkRBdE5ERTVaUzA0TnpSaExXTXlaREF4TVdNMU1XTTBOeUlzSW5OMVlpSTZJbVpvTkhkdU9EWjNkMlJ1TkRoa2EyNGlMQ0pwYzNNaU9pSkJkWFJvZVNJc0ltMWxjbU5vWVc1MElqcDdJbkIxWW14cFkxOXBaQ0k2SW1ab05IZHVPRFozZDJSdU5EaGthMjRpTENKMlpYSnBabmxmWTJGeVpGOWllVjlrWldaaGRXeDBJanBtWVd4elpYMHNJbkpwWjJoMGN5STZXeUp0WVc1aFoyVmZkbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LmNuZ252WlFldGxYWUc5bnlLVWdhTFc4bTZ1eTFkVzU3VWEtVFJ0QVJ5UDVRYWNYazFQam5KSzdUb1otWTQ5ZElQdVZzZ3Y2Ri1nVmdxQ2tGMDctOE5BIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2ZoNHduODZ3d2RuNDhka24vY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZmg0d244Nnd3ZG40OGRrbi9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9maDR3bjg2d3dkbjQ4ZGtuIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6Ik5vbmUiLCJjbGllbnRJZCI6IkFUa0wtZlQwVnZzcVhiYzNOTFNTeDZCckN1emxqWDhRWGxQWnhDNTg3cUs3bTc4QWJNTXFoN3JSNndRcDNuMmZrS2tUNGFTc2tmMG42QlpMIiwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6ZmFsc2UsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoibm9uZSIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiZmg0d244Nnd3ZG40OGRrbiIsInZlbm1vIjoib2ZmIn0=',
    })
    .then(result => {
      console.log(result)
      alert(result)
    })
    .catch((error) => {
      console.log(error);
    });
  }
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
      <TouchableOpacity style={styles.button} onPress={onPressPayPal}>
        <Text>Pay with Paypal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressStripe}>
        <Text>Pay with Stripe</Text>
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
