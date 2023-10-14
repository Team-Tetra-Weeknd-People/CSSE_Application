import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Home({ navigation }) {
    return (
        <View>
            <Text>Home</Text>
            <Button title="Go to ProcStaffLogin" onPress={() => navigation.navigate('ProcStaffLogin')} />
            <Button title="Go to SelectUser" onPress={() => navigation.navigate('SelectUser')} />
        </View>
    )
}