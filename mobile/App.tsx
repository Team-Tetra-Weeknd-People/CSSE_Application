import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  Home,
  ProcStaffLogin,
  ManagerLogin,
  SiteManagerLogin,
  SupplierLogin,
  ManagerDashboard,
  ProcStaffDashboard,
  SiteManagerDashboard,
  SupplierDashboard,
  Grid,
} from './pages';
import ProcurementStaffMain from './pages/ProcurementStaff/ProcurementStaffMain';
import ManagerPlaceOrder from './pages/Manager/ManagerPlaceorder';

const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
       screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1D1D27",
        },
        headerShown: true,
        headerTitle: () => (
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "Montserrat-Regular",
              paddingTop: 15,
              letterSpacing: 1,
            }}
          >
            SHMOFY
          </Text>
        ),
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProcStaffLogin" component={ProcStaffLogin} />
        <Stack.Screen name="ManagerLogin" component={ManagerLogin} />
        <Stack.Screen name="SiteManagerLogin" component={SiteManagerLogin} />
        <Stack.Screen name="SupplierLogin" component={SupplierLogin} />
        <Stack.Screen name="ManagerDashboard" component={ManagerDashboard} />
        <Stack.Screen name="ManagerPlaceOrder" component={ManagerPlaceOrder} />
        <Stack.Screen
          name="Procurement Staff"
          component={ProcurementStaffMain}
        />
        <Stack.Screen
          name="SiteManagerDashboard"
          component={SiteManagerDashboard}
        />
        <Stack.Screen name="SupplierDashboard" component={SupplierDashboard} />
        <Stack.Screen name="Grid" component={Grid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
