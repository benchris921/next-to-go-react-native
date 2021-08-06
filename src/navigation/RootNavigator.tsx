import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import NextToGoScreen from '@src/screens/NextToGoScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NextToGoScreen">
      <Stack.Screen name="NextToGoScreen" component={NextToGoScreen} options={{ title: "Next to go"}}/>
    </Stack.Navigator>
  );
}

export default RootNavigator;