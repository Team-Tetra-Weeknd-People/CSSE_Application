import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  return (
      <Tab.Navigator
        initialRouteName={dashboardName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === dashboardName) {
              iconName = focused ? 'activity' : 'activity-outline';

            } else if (rn === orderReqName) {
              iconName = focused ? 'layers' : 'layers-outline';

            } else if (rn === deliveryNoteName) {
              iconName = focused ? 'filetext1' : 'filetext1-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={dashboardName} component={ProcDashboardScreen} />
        <Tab.Screen name={orderReqName} component={ProcOrderReqScreen} />
        <Tab.Screen name={deliveryNoteName} component={ProcDeliveryNoteScreen} />

      </Tab.Navigator>
  );
}

export default ProcurementStaffMain;