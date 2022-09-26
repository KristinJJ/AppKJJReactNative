/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, FlatList, Button, View, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    padding: 20,
  },
  mainText: {
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
  },
  listItem: {
    padding: 10,
    fontSize: 24,
    height: 64,
  },
  userImage: {
    width: '100%',
    height: '80%',
  },
  userContainer: {
    flex: 1,
    margin: 50,
  },
  user: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'center',
  },
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Text style={styles.mainTitle}>AppKJJ</Text>
      <Text style={styles.mainText}>
        This is a React Native app for AD 340. Below is a list of people.
      </Text>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="People" component={PeopleScreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="List of People"
      onPress={() => navigation.navigate('People', {name: 'People List'})}
    />
  );
};

const PeopleScreen = ({navigation}) => {
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    fetch('https://fakerapi.it/api/v1/users?_quantity=10')
      .then(response => response.json())
      .then(json => {
        setPeopleList(json.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onSelectUser = user => {
    navigation.navigate('Details', {user});
  };

  return (
    <FlatList
      data={peopleList}
      renderItem={({item}) => (
        <Text
          style={styles.listItem}
          title={item.key}
          onPress={() => onSelectUser(item)}>
          {`${item.firstname} ${item.lastname}`}
        </Text>
      )}
    />
  );
};

const DetailScreen = ({route}) => {
  const {user} = route.params;

  return (
    <View style={styles.userContainer}>
      <Text style={styles.user}>
        Full Name: {`${user.firstname} ${user.lastname}`}
      </Text>
      <Text style={styles.user}>Username: {user.username}</Text>
      <Text style={styles.user}>Email: {user.email}</Text>
      <Text style={styles.user}>Website: {user.website}</Text>
      <Text style={styles.user}>Image: </Text>
      <Image
        style={styles.userImage}
        source={{
          uri: `${user.image}${Math.random()}`,
        }}
      />
    </View>
  );
};

export default App;
