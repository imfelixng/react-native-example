import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Realm from 'realm';


const App = () => {
  const [realm, setRealm] = React.useState(null);

  React.useEffect(() => {
    (
      async () => {
        let realmDB = null;
        try {
          realmDB = await Realm.open(
            {
              schema: [{name: 'Dog', properties: {name: 'string'}}]
            }
          )
        } catch (error) {
          console.log(error);
          realmDB = null;
        }

        if (realmDB) {
          realmDB.write(() => {
            realmDB.create('Dog', {name: 'Pug'});
          });
          setRealm(realmDB);
        }

      }
    )()
  }, [])

  const info = realm
  ? 'Number of dogs in this Realm: ' + realm.objects('Dog').length
  : 'Loading...';

  return (
    <View style={styles.container}>
      <Text>{info}</Text>
    </View>
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
