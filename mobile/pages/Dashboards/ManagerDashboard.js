import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import OrderService from '../../services/Order.Service';
// import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const [orderRequests, setOrderRequests] = useState([]);
  const [filteredOrderRequests, setFilteredOrderRequests] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleCheckStatus = (status) => {
    let styles = {};
  
    switch (status) {    
      case "Approval Requested":
        styles = {
          backgroundColor: "#ffc414",
        };
        break;
        case "Approved":
          styles = {
            backgroundColor: "#51eb49",
          };
          break;
      case "Rejected":
          styles = {
              backgroundColor: "#ff4444",
              color: "white",
          };
          break;            
      default:
        styles = {
          backgroundColor: "#ce91ff",
        };
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
    navigation.navigate(`/manager-placeorder/${id}`);
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
  const allowedStatus = ["Approved", "Approval Requested", "Rejected"];

  const filteredData = data.filter((orderRequest) =>
    allowedStatus.includes(orderRequest.status)
  );

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
            <Text style={styles.label}>Item ID</Text>
            <Text>{item._id}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.label}>Item Name</Text>
            <Text>{item.itemName}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.label}>Status</Text>
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