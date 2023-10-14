import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';

export default function Home({navigation}) {
  const data = [
    {id: '1', title: 'Procurement Staff', nav: 'ProcStaffLogin'},
    {id: '2', title: 'Site Manager', nav: 'SiteManagerLogin'},
    {id: '3', title: 'Manager', nav: 'ManagerLogin'},
    {id: '4', title: 'Supplier', nav: 'SupplierLogin'},
  ];

  const GridItem = ({item}) => (
    // add a sample image with the touchable opacity
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigation.navigate(item.nav)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        {/* image */}
        <Image
          source={{
            uri: 'https://i.ibb.co/qm7PS1D/mobile-login-concept-illustration-114360-83.jpg',
          }}
          style={styles.image}
        />
      </View>

      <FlatList
        data={data}
        numColumns={2} // Change this value to control the number of columns
        keyExtractor={item => item.id}
        renderItem={({item}) => <GridItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 400,
    height: 400,
  },
});
