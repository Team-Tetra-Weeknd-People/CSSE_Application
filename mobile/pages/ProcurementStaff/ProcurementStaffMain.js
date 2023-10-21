import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';

// Screens
import ProcDashboardScreen from './Screens/ProcDashboardScreen';
import ProcOrderReqScreen from './Screens/ProcOrderReqScreen';
import ProcDeliveryNoteScreen from './Screens/ProcDeliveryNoteScreen';
//Screen names
const dashboardName = "Dashboard";
const orderReqName = "Order Requests";
const deliveryNoteName = "Delivery Notes";

const Tab = createBottomTabNavigator();

function ProcurementStaffMain() {
  var routeName = 'Procurement Staff';
  return (
    <Tab.Navigator
      initialRouteName={dashboardName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === dashboardName) {
            iconName = focused ? 'grid' : 'grid-outline';

          } else if (rn === orderReqName) {
            iconName = focused ? 'layers' : 'layers-outline';

          } else if (rn === deliveryNoteName) {
            iconName = focused ? 'send' : 'send-outline';
          }
          routeName = rn;
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: '#1D1D27',
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 12, fontFamily: 'Montserrat-SemiBold', letterSpacing: 1 },
        tabBarStyle: { padding: 10, height: 75 },
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#1D1D27',
          height: 25,
        },
        headerShown: true,
        headerTitle: () => (
          <Text style={{
            fontSize: 13,
            color: 'red',
            fontFamily: 'Montserrat-SemiBold',
            letterSpacing: 1,
            flex: 1
          }}>
            {routeName}
          </Text>
        ),
      })}


    >

      <Tab.Screen name={dashboardName} component={ProcDashboardScreen} />
      <Tab.Screen name={orderReqName} component={ProcOrderReqScreen} />
      <Tab.Screen name={deliveryNoteName} component={ProcDeliveryNoteScreen} />

    </Tab.Navigator>
  );
}

export default ProcurementStaffMain;