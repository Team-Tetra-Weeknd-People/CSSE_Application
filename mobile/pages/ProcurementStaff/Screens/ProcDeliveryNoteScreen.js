import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProcDeliveryNoteScreen({ route }) {
  // Extract the deliveryNote object from the route params
  const { deliveryNote } = route.params || {};

  return (
    <ScrollView>
    {deliveryNote ? (<View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Delivery Note ID:</Text>
        <Text style={styles.value}>{deliveryNote._id}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{deliveryNote.orderId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Supplier ID:</Text>
        <Text style={styles.value}>{deliveryNote.supplierId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Created Date:</Text>
        <Text style={styles.value}>{deliveryNote.createdOn.toString().split("T")[0]}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Created Time:</Text>
        <Text style={styles.value}>{deliveryNote.createdOn.toString().split("T")[1].toString().split("Z")[0]}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Last Updated Date:</Text>
        <Text style={styles.value}>{deliveryNote.updatedOn.toString().split("T")[0]}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Last Updated Time:</Text>
        <Text style={styles.value}>{deliveryNote.updatedOn.toString().split("T")[1].toString().split("Z")[0]}</Text>
      </View>
      <View style={styles.deliveryDescriptionContainer}>
        <Text style={styles.label}>Delivery Description:</Text>
        <Text style={styles.deliveryDescription}>{deliveryNote.deliveryDescription}</Text>
      </View>
      <View style={styles.deliveryDescriptionContainer}>
        <Text style={styles.label}>Delivery Note:</Text>
        <Text style={styles.deliveryDescription}>{deliveryNote.deliveryNote}</Text>
      </View>
      <View style={styles.deliveryDescriptionContainer}>
        <Text style={styles.label}>Item Description:</Text>
        <Text style={styles.deliveryDescription}>{deliveryNote.itemDescription}</Text>
      </View>
      
    </View>): <View><Text>Please Select an Order From Order Requests Tab</Text></View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'purple',
  },
  deliveryDescription: {
    color: 'purple',
    fontSize: 16,
  },
});
