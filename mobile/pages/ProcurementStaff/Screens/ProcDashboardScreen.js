import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import PieChart from 'react-native-pie-chart';
import OrderService from "../../../services/Order.Service";
import ProcurementStaff from "../../../services/ProcurementStaff.Service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatusTable from '../components/StatusTable';

function ProcDashboardScreen() {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [procurementStaff, setProcurementStaff] = useState({});
  const [series, setSeries] = useState([]);
  const [sliceColor, setSliceColor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProcurementStaff.getOneProcurementStaff(AsyncStorage.getItem("id"))
      .then((res) => {
        setProcurementStaff(res.data);
      })
      .catch((error) => {
        // Handle the error
      });
  }, []);

  useEffect(() => {
    // Fetch orders from your API using OrderService
    OrderService.getAllOrder()
      .then((res) => {
        // Group orders by status
        const orders = res.data;
        const statusCounts = {};

        orders.forEach((order) => {
          const status = order.status;
          if (statusCounts[status]) {
            statusCounts[status]++;
          } else {
            statusCounts[status] = 1;
          }
        });

        // Define colors for different statuses
        const statusColors = {
          "To Be Priced": "#ff444499",
          Priced: "#d861258f",
          "Approval Requested": "#ffc41499",
          Approved: "#51eb4999",
          Rejected: "#ff0000",
          Confirmed: "#00bcd499",
          Delivered: "#0d47a1",
          "Sent To Delivery": "#77777788",
        };

        // Create data for the pie chart
        const data = Object.keys(statusCounts).map((status) => ({
          name: status,
          value: statusCounts[status],
          color: statusColors[status] || "#ce91ff99",
        }));

        setOrderStatusData(data);
        setSliceColor(data.map((item) => item.color));
        setSeries(data.map((item) => item.value));
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        // Handle the error
        setLoading(false); // Data loading failed
      });
  }, []);

  const widthAndHeight = 250;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.orderStatusTitle}><Text style={styles.title}>ORDERS STATUS</Text></View>

        <View style={styles.orderStatus}>
          {loading ? (
            // Display a loading indicator while data is being fetched
            <ActivityIndicator size="large" color="#000" />
          ) : (
            // Conditionally render the PieChart when data is available
            <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} label />
          )}
        </View></View>
      <StatusTable />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderStatus: {
    alignSelf: 'center',
  },
  orderStatusTitle: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    margin: 10,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ProcDashboardScreen;
