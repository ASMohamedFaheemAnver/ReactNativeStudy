import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AdvancedSettingsScreen from '../AdvancedSettingsScreen';
import SettingsScreen from '../SettingsScreen';

const SettingsStackNavigator = () => {
  const SettingsStack = createNativeStackNavigator();

  return (
    <SettingsStack.Navigator initialRouteName="settings">
      <SettingsStack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={SettingsScreen}></SettingsStack.Screen>
      <SettingsStack.Screen
        name="AdvancedSettings"
        options={{headerShown: false}}
        component={AdvancedSettingsScreen}></SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
