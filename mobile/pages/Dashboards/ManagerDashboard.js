import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import OrderService from '../../services/Order.Service';
import { useNavigation } from '@react-navigation/native';
// import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const [orderRequests, setOrderRequests] = useState([]);
  const [filteredOrderRequests, setFilteredOrderRequests] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();
  const handleCheckStatus = (status) => {
    let styles = {};

    switch (status) {
      case "To Be Priced":
        styles = {
          backgroundColor: "#ff444499",
        };
        break;
      case "Priced":
        styles = {
          backgroundColor: "#d861258f",
        };
        break;

      case "Approval Requested":
        styles = {
          backgroundColor: "#ffc41499",
        };
        break;
      case "Approved":
        styles = {
          backgroundColor: "#51eb4999",
        };
        break;
      case "Rejected":
        styles = {
          backgroundColor: "#ff0000",
          color: "#fff",
        };
        break;
      case "Confirmed":
        styles = {
          backgroundColor: "#00bcd499",
        };
        break;
      case "Delivered":
        styles = {
          backgroundColor: "#0d47a1",
          color: "#fff",
        };
        break;
      case "Sent To Delivery":
        styles = {
          backgroundColor: "#77777788",
        };
        break;
        case "Received":
        styles = {
          backgroundColor: "#00ff00",
        };
        break;
        case "Completed":
        styles = {
          backgroundColor: "#ce91ff99",
        };
        break;
      default:
        styles = {
          backgroundColor: "#ce91ff99",
        };
        break;
    }
  
    return styles;
  };
  useEffect(() => {
    try {
      OrderService.getAllOrder().then((res) => {
        setOrderRequests(res.data);
        setFilteredOrderRequests(res.data); // Initialize filteredOrderRequests with all order requests
      });
    } catch (error) {
      console.error(error);
    }
  }, []);


  // const navigate = useNavigate();

  function handleRequestClick(id) {
    // navigate(`/manager-placeorder/${id}`);
    // navigation.navigate(`/manager-placeorder/${id}`);
    navigation.navigate('ManagerPlaceOrder', { orderId: id });
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter order requests based on the search input
    const filtered = orderRequests.filter((orderRequest) =>
      orderRequest.itemName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrderRequests(filtered);
  };

  return (
    <View style={styles.wholeContent}>
      <View style={styles.rightContent}>
        <View style={styles.managerContent}>
          <View style={styles.managerTodayOrders}>
            <Text style={styles.managerToday}>Place Orders</Text>
            <View style={styles.managerTodayOrdersList}>
            <View style={styles.rowHead}>
                <View style={styles.cellHead}>
            <Text style={styles.label}>ITEM ID</Text></View>
            <View style={styles.cellHead}>
            <Text style={styles.label}>ITEM NAME</Text></View>
            <View style={styles.cellHead}>
            <Text style={styles.label}>STATUS</Text></View>
            </View>
              <OrderRequestsTable
                data={filteredOrderRequests}
                onRowClick={handleRequestClick}
                checkStatus={handleCheckStatus}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function OrderRequestsTable({ data, onRowClick, checkStatus }) {

  const filteredData = data;

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.row, checkStatus(item.status)]}
          onPress={() => onRowClick(item._id)}
        >
          <View style={styles.cell}>
            <Text>{item._id}</Text>
          </View>
          <View style={styles.cell}>
            <Text>{item.itemName}</Text>
          </View>
          <View style={styles.cell}>
            <Text>{item.status}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wholeContent: {
    flex: 1,
    flexDirection: 'row',
  },
  rowHead: {
    flexDirection: 'row',
  },
  cellHead: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },

  rightContent: {
    flex: 1,
    margin: 10,
    // Add styles for the right content
  },
  managerToday: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    textTransform: 'uppercase',
    color: '#000000',
    marginLeft: 10,
  },
  // ... Define styles for other components
  row: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: 'white',
    borderTopWidth: 3,
    borderRadius: 15,
  },
  cell: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderCurve: 10,
    marginLeft: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});