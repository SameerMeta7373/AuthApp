import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setfetchedMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  console.log('token ===>', token);

  useEffect(() => {
    axios
      .get(
        'https://react-native-d4e74-default-rtdb.firebaseio.com/message.json?auth=' +
          token,
      )
      .then(response => {
        setfetchedMessage(response.data);
      })
      .catch(error => console.log('error===>', error));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
});
