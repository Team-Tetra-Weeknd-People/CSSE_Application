import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// Replace these with your actual service calls
import { getAllOrder } from '../../../services/Order.Service';
import DeliveryNoteService from '../../../services/DeliveryNote.Service';
import { useNavigation } from '@react-navigation/native';

export default function ProcOrderReqScreen() {
    const [orderRequests, setOrderRequests] = useState([]);
    const [filteredOrderRequests, setFilteredOrderRequests] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        // Replace with your service call to fetch order requests
        getAllOrder()
            .then((res) => {
                setOrderRequests(res.data);
                setFilteredOrderRequests(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function handleRequestClick(id) {
        // Add your navigation logic here when a row is clicked
        DeliveryNoteService.getDeliveryNoteOrder(id).then((res) => {
            console.log(res.data[0]);
            navigation.navigate('Delivery Notes', { deliveryNote: res.data[0], orderId: id });
        });
    }

    const handleSearchChange = (text) => {
        setSearchValue(text);

        // Filter order requests based on the search input
        const filtered = orderRequests.filter((orderRequest) =>
            orderRequest.itemName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOrderRequests(filtered);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>ORDER REQUESTS</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Order Requests by Item"
                value={searchValue}
                onChangeText={handleSearchChange}
            />
            <View style={styles.rowHead}>
                <View style={styles.cellHead}>
            <Text style={styles.label}>ITEM ID</Text></View>
            <View style={styles.cellHead}>
            <Text style={styles.label}>ITEM NAME</Text></View>
            <View style={styles.cellHead}>
            <Text style={styles.label}>STATUS</Text></View>
            </View>
            
            <FlatList
                data={filteredOrderRequests}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.row, { backgroundColor: checkStatus(item.status).backgroundColor }]}
                        onPress={() => handleRequestClick(item._id)}
                    >
                        <View style={styles.cell}>
                            <Text style={styles.value}>{item._id}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.value}>{item.itemName}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.value}>{item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

function checkStatus(status) {
    switch (status) {
        case 'To Be Priced':
            return { backgroundColor: '#ff444499' };
        case 'Priced':
            return { backgroundColor: '#d861258f' };
        case 'Approval Requested':
            return { backgroundColor: '#ffc41499' };
        case 'Approved':
            return { backgroundColor: '#51eb4999' };
        case 'Rejected':
            return { backgroundColor: '#ff0000', color: '#fff' };
        case 'Confirmed':
            return { backgroundColor: '#00bcd499' };
        case 'Sent To Delivery':
            return { backgroundColor: '#77777788' };
        case 'Delivered':
            return { backgroundColor: '#0d47a1', color: '#fff' };
        case 'Received':
            return { backgroundColor: '#00ff00', color: '#fff' };
        case 'Completed':
            return { backgroundColor: '#ce91ff99' };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    rows: {},
    heading: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 10,
        color: '#000',
    },
    searchBar: {
        height: 40,
        borderColor: '#0003',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontFamily: 'Montserrat-Regular',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderColor: 'white',
        borderTopWidth: 3,
        borderRadius: 15,
      },
      rowHead: {
        flexDirection: 'row',
      },
      cellHead: {
        flex: 1,
        padding: 10,
        marginLeft: 10,
      },
    rowText: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
    },
    cell: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderCurve: 10,
        marginLeft: 10,
      },
      label: {
        fontSize: 13,
        marginBottom: 5,
        color: 'black',
        fontFamily: 'Montserrat-Bold',
      },
      value: {
        fontSize: 13,
        marginBottom: 5,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
      },
});
