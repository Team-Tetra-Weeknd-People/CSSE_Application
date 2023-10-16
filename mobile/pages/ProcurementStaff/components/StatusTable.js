import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const statusColors = {
  "To Be Priced": "#ff444499",
  Priced: "#d861258f",
  "Approval Requested": "#ffc41499",
  Approved: "#51eb4999",
  Rejected: "#ff0000",
  Confirmed: "#00bcd499",
  Delivered: "#0d47a1",
  "Sent To Delivery": "#77777788",
};

const StatusTable = () => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableRow}>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Color</Text>
      </View>
      {Object.entries(statusColors).map(([status, color]) => (
        <View key={status} style={styles.tableRow}>
          <Text style={styles.dataCell}>{status}</Text>
          <View style={styles.colorCell}>
            <View style={[styles.colorBox, { backgroundColor: color }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginVertical: 20,
    marginLeft: 100,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  dataCell: {
    flex: 1,
    fontSize: 16,
  },
  colorCell: {
    flex: 1,
    alignItems: 'left', // Center the color dot vertically
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default StatusTable;
