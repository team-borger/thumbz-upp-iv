import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AuthService } from './../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnectyCube from 'react-native-connectycube';

const App = ({ navigation }) => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const setValue = async () => {
    try {
      const value = await AsyncStorage.getItem('userId')
      if(value !== null) {
        console.log(value)
        navigation.navigate('Call')
      }
    } catch(e) {
      console.error(e)
    }
  }

  const logout = () => {
    AuthService.logout()
    navigation.navigate('Login')
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <Text></Text>
        <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <View
            style={[styles.authBtn, styles.centeredChildren]}>
            <Text style={styles.authBtnText}>
              {"Open drawer"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setValue()}>
          <View
            style={[styles.authBtn, styles.centeredChildren]}>
            <Text style={styles.authBtnText}>
              {"Go to call"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <View
            style={[styles.authBtn, styles.centeredChildren]}>
            <Text style={styles.authBtnText}>
              {"Logout"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  navigationContainer: {
    // backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  f1: {
    flex: 1,
  },
  authBtn: {
    backgroundColor: 'green',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 5,
  },
  authBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default App;
