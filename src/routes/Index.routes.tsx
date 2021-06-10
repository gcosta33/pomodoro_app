import React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AplicationProvider } from '../Contexts/Context'

const Tex = () => <View><Text>pça</Text></View>



export default function Index() {
  const Stack = createStackNavigator()
  return (
    <AplicationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Apresentation'>
          <Stack.Screen component={Tex} name='Apresentation' />
          <Stack.Screen component={Tex} name='Home' />
        </Stack.Navigator>
      </NavigationContainer>
    </AplicationProvider>
  )
}