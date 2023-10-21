import { useParams } from "react-router-dom";
import OrderService from "../../services/Order.Service";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom'; // Adjust the router for React Native
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

export default function ManagerPlaceOrder() {
  const { id } = useParams();
  const [orderRequest, setOrderRequest] = useState({});
  const [subTotal, setSubTotal] = useState(0);


  useEffect(() => {
    try {
      OrderService.getOneOrder(id).then((res) => {
        setOrderRequest(res.data);
        setSubTotal(res.data.subTotal);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleActionClick = (statChange) => {
          const newOrder = {
            status: statChange,
          };
          OrderService.updateOrder(id, newOrder)
            .catch((err) => {
              console.error(err);
            });
      }
    // });

const deleteRequest = () => {
      OrderService.deleteOrder(id)
        // .then((res) => {
        //     navigation.navigate('ManagerDashboard');
        // })
        .catch((err) => {
          console.error(err);
        });
    }

return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Request: {id}</Text>
        <Text style={styles.headerText}>Supplier: {orderRequest.supplierName}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderDetailsTitle}>Order Details</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Item Name:</Text>
              <Text>{orderRequest.itemName}</Text>
            </View>
            <View style={styles.cell}>
              <Text>Quantity:</Text>
              <Text>{orderRequest.quantity}</Text>
            </View>
            <View style={styles.cell}>
              <Text>Price per Unit (Rs.):</Text>
              <Text>{orderRequest.unitPrice}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text>Placed Date:</Text>
              <Text>{orderRequest.placedDate ? orderRequest.placedDate.split('T')[0] : ''}</Text>
            </View>
            <View style={styles.cell}>
              <Text>Expected Delivery:</Text>
              <Text>
                {orderRequest.deliveryDate ? orderRequest.deliveryDate.split('T')[0] : 'None'}
              </Text>
            </View>
            <View style={styles.cell}>
              <Text>Funding Account:</Text>
              <Text>{orderRequest.funding}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.subTotal}>Sub Total (Rs.): {subTotal ? subTotal.toFixed(2) : (0).toFixed(2)}</Text>
        <Text style={styles.status}>Status: {orderRequest.status}</Text>
      </View>
      <View style={styles.buttons}>
        {orderRequest.status === 'Approval Requested' && (
          <>
            <Button
              title="Approve"
              onPress={() => handleActionClick('Approved')}
            />
            <Button
              title="Reject"
              onPress={() => handleActionClick('Rejected')}
            />
            <Button title="Reject & Delete" onPress={deleteRequest} />
          </>
        )}
        {orderRequest.status === 'Approved' && (
          <>
            <Button
              title="Reject"
              onPress={() => handleActionClick('Rejected')}
            />
            <Button title="Reject & Delete" onPress={deleteRequest} />
          </>
        )}
        {orderRequest.status === 'Rejected' && (
          <Button title="Delete" onPress={deleteRequest} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
  },
  orderDetails: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginBottom: 16,
  },
  orderDetailsTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  table: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
  },
  subTotal: {
    fontSize: 16,
    marginTop: 16,
  },
  status: {
    fontSize: 16,
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});