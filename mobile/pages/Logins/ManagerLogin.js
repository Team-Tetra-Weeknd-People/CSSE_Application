import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function ManagerLogin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const data = {
      email: email,
      password: password,
    };

    if (email == '' || password == '') {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(
        'https://csse-backend-b5wl.onrender.com/api/manager/auth',
        data,
      );

      if (response.status == 200) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        AsyncStorage.setItem('id', decodedToken.id);
        AsyncStorage.getItem('id').then(value => {
          console.log(value);
        });
        navigation.navigate('ManagerDashboard');
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      alert('Login Failed');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
