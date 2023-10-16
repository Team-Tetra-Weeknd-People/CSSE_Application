import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SupplierDashboard({navigation}) {
  const [approvalOrders, setApprovalOrders] = useState([]);
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [sentOrders, setSentOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const [approvalModal, setApprovalModal] = useState(false);
  const [approvedModal, setApprovedModal] = useState(false);
  const [confirmedModal, setConfirmedModal] = useState(false);
  const [sentModal, setSentModal] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [order, setOrder] = useState({});

  const showApprovalModal = order => {
    setOrder(order);
    setApprovalModal(true);
  };

  const hideApprovalModal = () => {
    setApprovalModal(false);
  };

  const showApprovedModal = order => {
    setOrder(order);
    setApprovedModal(true);
  };

  const hideApprovedModal = () => {
    setApprovedModal(false);
  };

  const showConfirmedModal = order => {
    setOrder(order);
    setConfirmedModal(true);
  };

  const hideConfirmedModal = () => {
    setConfirmedModal(false);
  };

  const showSentModal = order => {
    setOrder(order);
    setSentModal(true);
  };

  const hideSentModal = () => {
    setSentModal(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('id').then(value => {
      const id = value;
      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Approval%20Requested/supplier/${id}`,
        )
        .then(res => {
          setApprovalOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Approved/supplier/${id}`,
        )
        .then(res => {
          setApprovedOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Confirmed/supplier/${id}`,
        )
        .then(res => {
          setConfirmedOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Sent%20to%20Delivery/supplier/${id}`,
        )
        .then(res => {
          setSentOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Delivered/supplier/${id}`,
        )
        .then(res => {
          setDeliveredOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/status/Completed/supplier/${id}`,
        )
        .then(res => {
          setCompletedOrders(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  async function approveOrder(order) {
    const id = order._id;
    const status = 'Approved';
    const data = {
      status,
    };
    await axios
      .put(`https://csse-backend-b5wl.onrender.com/api/order/${id}`, data)
      .then(res => {
        alert('Order Approved');
        console.log(res.data);
        setApprovalModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function confirmOrder(order) {
    const id = order._id;
    const status = 'Confirmed';
    const data = {
      status,
    };
    await axios
      .put(`https://csse-backend-b5wl.onrender.com/api/order/${id}`, data)
      .then(res => {
        alert('Order Confirmed');
        console.log(res.data);
        setApprovalModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function sendToDelivery(order) {
    const id = order._id;
    const status = 'Sent to Delivery';
    const deliveryDate = deliveryDate;
    const data = {
      status,
      deliveryDate,
    };
    await axios
      .put(`https://csse-backend-b5wl.onrender.com/api/order/${id}`, data)
      .then(res => {
        alert('Order Sent to Delivery');
        console.log(res.data);
        setApprovalModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function orderDelivered(order) {
    const id = order._id;
    const status = 'Delivered';
    const data = {
      status,
    };
    await axios
      .put(`https://csse-backend-b5wl.onrender.com/api/order/${id}`, data)
      .then(res => {
        alert('Order Delivered');
        console.log(res.data);
        setApprovalModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.textYellow}>Orders with Approval Request</Text>
          <Swiper style={styles.wrapper}>
            {approvalOrders.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => showApprovalModal(order)}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.textPurple}>Approved Orders</Text>
          <Swiper style={styles.wrapper}>
            {approvedOrders.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => showApprovedModal(order)}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.textGrey}>Confirmed Orders</Text>
          <Swiper style={styles.wrapper}>
            {confirmedOrders.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => showConfirmedModal(order)}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.textBlue}>Orders Sent To Delivery</Text>
          <Swiper style={styles.wrapper}>
            {sentOrders.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => showSentModal(order)}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.textGreen}>Delivered Orders</Text>
          <Swiper style={styles.wrapper}>
            {deliveredOrders.map((order, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.textDarkGreen}>Completed Orders</Text>
          <Swiper style={styles.wrapper}>
            {completedOrders.map((order, index) => (
              <TouchableOpacity key={index} style={styles.card}>
                <Text style={styles.content}>Site Name : {order.siteName}</Text>
                <Text style={styles.content}>
                  Order Date: {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>Item Name: {order.itemName}</Text>
                <Text style={styles.content}>Quantity: {order.quantity}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>

      <Modal isVisible={approvalModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order Details</Text>

            <Text style={styles.content}>Item Name : {order.itemName}</Text>
            <Text style={styles.content}>
              Item Description : {order.itemDescription}
            </Text>
            <Text style={styles.content}>Item Quantity : {order.quantity}</Text>
            <Text style={styles.content}>
              Order Date: {order.placedDate && order.placedDate.slice(0, 10)}
            </Text>

            <Text style={styles.content}></Text>
            <Text style={styles.content}>Site Name : {order.siteName}</Text>
            <Text style={styles.content}>
              Site Address : {order.siteAddress}
            </Text>
            <Text style={styles.content}>Site Phone : {order.siteContact}</Text>

            <Text style={styles.content}></Text>
            <Text style={styles.content}>
              Site Manager Name : {order.siteManagerfName}{' '}
              {order.siteManagerlName}
            </Text>
            <Text style={styles.content}>
              Site Manager Phone : {order.siteManagerContact}
            </Text>

            <Text style={styles.content}></Text>

            <Button
              title='Approve Order'
              onPress={() => {
                approveOrder(order);
              }}
            />
            <Text style={styles.content}></Text>
            <Button
              title='Close'
              onPress={() => {
                hideApprovalModal();
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal isVisible={approvedModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order Details</Text>

            <Text style={styles.content}>Item Name : {order.itemName}</Text>
            <Text style={styles.content}>
              Item Description : {order.itemDescription}
            </Text>
            <Text style={styles.content}>Item Quantity : {order.quantity}</Text>
            <Text style={styles.content}>
              Order Date: {order.placedDate && order.placedDate.slice(0, 10)}
            </Text>

            <Text style={styles.content}></Text>
            <Text style={styles.content}>Site Name : {order.siteName}</Text>
            <Text style={styles.content}>
              Site Address : {order.siteAddress}
            </Text>
            <Text style={styles.content}>Site Phone : {order.siteContact}</Text>

            <Text style={styles.content}></Text>
            <Text style={styles.content}>
              Site Manager Name : {order.siteManagerfName}{' '}
              {order.siteManagerlName}
            </Text>
            <Text style={styles.content}>
              Site Manager Phone : {order.siteManagerContact}
            </Text>

            <Text style={styles.content}></Text>

            <Button
              title='Confirm Order'
              onPress={() => {
                confirmOrder(order);
              }}
            />
            <Text style={styles.content}></Text>
            <Button
              title='Close'
              onPress={() => {
                hideApprovedModal();
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal isVisible={confirmedModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order Details</Text>
            <Text style={styles.content}>Item Name : {order.itemName}</Text>
            <Text style={styles.content}>
              Item Description : {order.itemDescription}
            </Text>
            <Text style={styles.content}>Item Quantity : {order.quantity}</Text>
            <Text style={styles.content}>
              Order Date: {order.placedDate && order.placedDate.slice(0, 10)}
            </Text>
            <Text style={styles.content}></Text>
            <Text style={styles.content}>Site Name : {order.siteName}</Text>
            <Text style={styles.content}>
              Site Address : {order.siteAddress}
            </Text>
            <Text style={styles.content}>Site Phone : {order.siteContact}</Text>
            <Text style={styles.content}></Text>
            <Text style={styles.content}>
              Site Manager Name : {order.siteManagerfName}{' '}
              {order.siteManagerlName}
            </Text>
            <Text style={styles.content}>
              Site Manager Phone : {order.siteManagerContact}
            </Text>
            <Text style={styles.content}></Text>
            <DatePicker
              date={deliveryDate}
              onDateChange={date => setDeliveryDate(date)}
              mode='date'
            />
            <Text style={styles.content}></Text>
            <Button
              title='Send to Delivery'
              onPress={() => {
                sendToDelivery(order);
              }}
            />
            <Text style={styles.content}></Text>
            <Button
              title='Close'
              onPress={() => {
                hideConfirmedModal();
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal isVisible={sentModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Order Details</Text>
            <Text style={styles.content}>Item Name : {order.itemName}</Text>
            <Text style={styles.content}>
              Item Description : {order.itemDescription}
            </Text>
            <Text style={styles.content}>Item Quantity : {order.quantity}</Text>
            <Text style={styles.content}>
              Order Date: {order.placedDate && order.placedDate.slice(0, 10)}
            </Text>
            <Text style={styles.content}></Text>
            <Text style={styles.content}>Site Name : {order.siteName}</Text>
            <Text style={styles.content}>
              Site Address : {order.siteAddress}
            </Text>
            <Text style={styles.content}>Site Phone : {order.siteContact}</Text>
            <Text style={styles.content}></Text>
            <Text style={styles.content}>
              Site Manager Name : {order.siteManagerfName}{' '}
              {order.siteManagerlName}
            </Text>
            <Text style={styles.content}>
              Site Manager Phone : {order.siteManagerContact}
            </Text>
            <Text style={styles.content}></Text>
            <Button
              title='Order Delivered'
              onPress={() => {
                orderDelivered(order);
              }}
            />
            <Text style={styles.content}></Text>

            <Button
              title='Close'
              onPress={() => {
                hideSentModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
  },
  wrapper: {},

  row: {
    flex: 1,
    height: 200,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  titleBig: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  //yellow font
  textYellow: {
    color: '#8B8000',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  // purple font
  textPurple: {
    color: '#5C33F6',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  // grey font
  textGrey: {
    color: '#5A5A5A',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  // blue font
  textBlue: {
    color: '#007AFF',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  //green font
  textGreen: {
    color: '#4F7942',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  textDarkGreen: {
    color: '#228B22',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
});
