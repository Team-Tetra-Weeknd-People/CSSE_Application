import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export default function SupplierLogin() {
  const data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
    {id: '4', title: 'Item 4'},
    {id: '5', title: 'Item 5'},
    {id: '6', title: 'Item 6'},
    {id: '7', title: 'Item 7'},
    {id: '8', title: 'Item 8'},
    {id: '9', title: 'Item 9'},
    {id: '10', title: 'Item 10'},
  ];

  const GridItem = ({item}) => (
    <View style={styles.gridItem}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      numColumns={2} // Change this value to control the number of columns
      keyExtractor={item => item.id}
      renderItem={({item}) => <GridItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
