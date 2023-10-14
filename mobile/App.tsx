import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  ProcStaffLogin,
  ManagerLogin,
  SiteManagerLogin,
  SupplierLogin,
  Grid,
} from './pages';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProcStaffLogin" component={ProcStaffLogin} />
        <Stack.Screen name="ManagerLogin" component={ManagerLogin} />
        <Stack.Screen name="SiteManagerLogin" component={SiteManagerLogin} />
        <Stack.Screen name="SupplierLogin" component={SupplierLogin} />

        <Stack.Screen name="Grid" component={Grid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
