/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <>
      <FlatList
        data={[
          {key: 'The Sandman'},
          {key: 'Primal'},
          {key: 'Our Great National Parks'},
          {key: 'House of the Dragon'},
        ]}
        renderItem={({item}) => (
          <Button
            title={item.key}
            onPress={() => navigation.navigate('Details', {name: item.key})}
          />
        )}
      />
    </>
  );
};

const DetailScreen = ({route}) => {
  return <Text>This is {route.params.name}'s details</Text>;
};

const App = () => {
  return (
    <>
      <Text style={styles.title}>AppKJJ</Text>
      <Text style={styles.text}>
        This is a React Native app for AD 340. Below is a list of people.
      </Text>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;
