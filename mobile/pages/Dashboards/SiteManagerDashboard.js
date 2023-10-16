import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SiteManagerDashboard() {
  const [sites, setSites] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('id').then(value => {
      const id = value;
      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/site/sitemanager/${id}`,
        )
        .then(res => {
          setSites(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });

    AsyncStorage.getItem('id').then(value => {
      const id = value;
      axios
        .get(
          `https://csse-backend-b5wl.onrender.com/api/order/sitemanager/${id}`,
        )
        .then(res => {
          setOrders(res.data.reverse());
        })
        .catch(err => {
          console.log(err);
        });
    });

    axios
      .get('https://csse-backend-b5wl.onrender.com/api/supplier/')
      .then(res => {
        setSuppliers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getStatusColor = status => {
    let styles = {};

    switch (status) {
      case 'To Be Priced':
        styles = {
          backgroundColor: '#ff4444',
        };
        break;
      case 'Priced':
        styles = {
          backgroundColor: '#d86125',
        };
        break;

      case 'Approval Requested':
        styles = {
          backgroundColor: '#ffc414',
        };
        break;
      case 'Approved':
        styles = {
          backgroundColor: '#51eb49',
        };
        break;
      case 'Rejected':
        styles = {
          backgroundColor: '#ffcccb',
        };
        break;
      case 'Confirmed':
        styles = {
          backgroundColor: '#00bcd4',
        };
        break;
      case 'Delivered':
        styles = {
          backgroundColor: '#8CE68C',
        };
        break;
      case 'Sent To Delivery':
        styles = {
          backgroundColor: '#ADD8E6',
        };
        break;
      default:
        styles = {
          backgroundColor: '#D3D3D3',
        };
    }

    return styles;
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  async function placeOrder() {
    const data = {
      siteName: selectedSite,
      supplierName: selectedSupplier,
      itemName: itemName,
      itemDescription: itemDescription,
      quantity: quantity,
      funding: funding,
    };

    console.log(data);

    if (
      selectedSite == '' ||
      selectedSupplier == '' ||
      itemName == '' ||
      itemDescription == '' ||
      quantity == '' ||
      funding == ''
    ) {
      alert('Please fill all fields');
      return;
    }

    AsyncStorage.getItem('id').then(async value => {
      const id = value;
      const siteManager = await axios.get(
        `https://csse-backend-b5wl.onrender.com/api/siteManager/${id}`,
      );

      const site = await axios.get(
        `https://csse-backend-b5wl.onrender.com/api/site/getOne/${selectedSite}`,
      );

      const supplier = await axios.get(
        `https://csse-backend-b5wl.onrender.com/api/supplier/${selectedSupplier}`,
      );

      const data = {
        siteManagerID: id,
        siteManagerfName: siteManager.data.fname,
        siteManagerlName: siteManager.data.lname,
        siteManagerContact: siteManager.data.contactNo,
        siteName: site.data.siteName,
        siteAddress: site.data.address,
        siteContact: site.data.contact,
        supplierId: selectedSupplier,
        supplierName: supplier.data.shopName,
        itemName: itemName,
        itemDescription: itemDescription,
        quantity: quantity,
        funding: funding,
      };

      // handle add order with success alert
      axios
        .post('https://csse-backend-b5wl.onrender.com/api/order/', data)
        .then(res => {
          alert('Order Placed Successfully');
          axios
            .get(
              `https://csse-backend-b5wl.onrender.com/api/order/sitemanager/${id}`,
            )
            .then(res => {
              setOrders(res.data.reverse());
            })
            .catch(err => {
              console.log(err);
            });
          hideModal();
        })
        .catch(err => {
          alert('Order Placing Failed');
          console.log(err);
        });
    });
  }

  const [selectedSite, setSelectedSite] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [funding, setFunding] = useState('');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.titleBig}>Sites</Text>
          <Swiper style={styles.wrapper}>
            {sites.map(site => (
              <View style={styles.card} key={site._id}>
                <Text style={styles.title}>{site.siteName}</Text>
                <Text style={styles.content}>{site.address}</Text>
                <Text style={styles.content}>{site.contact}</Text>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <Text style={styles.titleBig}>Placed Orders</Text>
          <Swiper style={styles.wrapper}>
            {orders.map(order => (
              <View
                style={{
                  ...styles.card,
                  backgroundColor: getStatusColor(order.status).backgroundColor,
                }}
                key={order._id}>
                <Text style={styles.title}>{order.itemName}</Text>
                <Text style={styles.title}>{order.itemDescription}</Text>
                <Text style={styles.content}>{order.supplierName}</Text>
                <Text
                  style={{
                    borderRadius: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                    padding: 2,
                    color: getStatusColor(order.status).color,
                  }}>
                  {order.status ? order.status : 'Not Set Yet'}
                </Text>
                <Text style={styles.content}>
                  {order.placedDate.slice(0, 10)}
                </Text>
                <Text style={styles.content}>
                  {order.deliveryDate
                    ? order.deliveryDate.slice(0, 10)
                    : 'Not Set Yet'}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={showModal}
            style={{
              backgroundColor: '#3385ff',
              padding: 10,
              borderRadius: 5,
              margin: 30,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Place a New Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Site :</Text>
          <Picker
            selectedValue={selectedSite}
            onValueChange={itemValue => setSelectedSite(itemValue)}>
            <Picker.Item label='Select One' value='' />
            {sites.map(site => (
              <Picker.Item
                key={site._id}
                label={site.siteName}
                value={site._id}
              />
            ))}
          </Picker>

          <Text style={styles.modalText}>Supplier :</Text>
          <Picker
            selectedValue={selectedSupplier}
            onValueChange={itemValue => setSelectedSupplier(itemValue)}>
            <Picker.Item label='Select One' value='' />
            {suppliers.map(supplier => (
              <Picker.Item
                key={supplier._id}
                label={supplier.shopName}
                value={supplier._id}
              />
            ))}
          </Picker>

          <Text style={styles.modalText}>Item Name :</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={text => setItemName(text)}
          />

          <Text style={styles.modalText}>Item Description :</Text>
          <TextInput
            style={styles.input}
            value={itemDescription}
            onChangeText={text => setItemDescription(text)}
          />

          <Text style={styles.modalText}>Quantity :</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={text => setQuantity(text)}
          />

          <Text style={styles.modalText}>Funding :</Text>
          <TextInput
            style={styles.input}
            value={funding}
            onChangeText={text => setFunding(text)}
          />

          <Text style={styles.modalText}>
            ...........................................................
          </Text>

          <Button title='Submit' onPress={placeOrder} style={styles.button} />
          <Text style={styles.modalText}></Text>
          <Button title='Close' onPress={hideModal} style={styles.button} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
  },
  wrapper: {},

  row: {
    flex: 1,
    height: 50,
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
});
