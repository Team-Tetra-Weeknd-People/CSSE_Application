import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import OrderService from '../../services/Order.Service'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function MangerPlaceOrder({ route }) {
  // Extract the deliveryNote object from the route params
  const {orderId}= route.params || {};
  const navigation = useNavigation();
  useEffect(() => {
    if(orderId === undefined){
      alert('Please Select an Order Request!');
      navigation.navigate('Order Requests');
    }
  }, [orderId]);
  
  const [order, setOrder] = useState({});
  
  useEffect(() => {
    try {
      OrderService.getOneOrder(orderId).then((res) => {
        setOrder(res.data);
      });
    } catch (error) {
      alert('Please Select an Order Request!');
      navigation.navigate('Order Requests');
      console.error(error);
    }
  }, [orderId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.orderContainer}>
        {order && (
          <>
            <Text style={styles.heading}>ORDER DETAILS</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{order._id}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Item Name:</Text>
              <Text style={styles.value}>{order.itemName}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Item Description:</Text>
              <Text style={styles.value}>{order.itemDescription}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{order.quantity}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Unit Price:</Text>
              <Text style={styles.value}>{order.unitPrice}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  DeliveryNotecontainer: {
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    borderColor: '#77777788',
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
    color: '#000',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deliveryDescriptionContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
  },
  value: {
    fontSize: 16,
    color: 'purple',
    fontFamily: 'Montserrat-Regular',
  },
  deliveryDescription: {
    color: 'purple',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  orderContainer: {
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    borderColor: '#77777788',
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
  },
  confirmButton: {
    backgroundColor: '#14D2B8',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#1D1D27',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  notAvailable: {
    height: 'auto',
    borderWidth: 1,
    padding: 10,
    borderColor: '#77777788',
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    marginVertical: 10,
    alignItems: 'center',
  },
  notAvailableText: {
    fontFamily: 'Montserrat-Regular',
  },
});
