import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, CustomJoystick, HugeButton } from './src/components';
import { icons } from './src/theme';
import { calculateWheelDirections } from './src/utils/calculateWheelDirections';
import { WebSocketManager } from './src/services/websocketManager';
import { NetworkInfo } from 'react-native-network-info';

function App(): React.JSX.Element {
  const [video, setVideo] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  const [mobileIpAddress, setMobileIpAddress] = useState('');

  useEffect(() => {
    // Load IP address from storage on app start
    const loadIpAddress = async () => {
      try {
        const storedIpAddress = await AsyncStorage.getItem('carIpAddress');
        if (storedIpAddress) {
          setIpAddress(storedIpAddress);
          WebSocketManager.getInstance().updateIpAddress(storedIpAddress); // Update WebSocket connection with stored IP
        }
      } catch (error) {
        console.error('Failed to load IP address:', error);
      }

      NetworkInfo.getIPAddress().then(myIp => {
        setMobileIpAddress(myIp?.toString() || '');
      });
    };

    loadIpAddress();
  }, []);

  const handleMove = (x: number, y: number) => {
    const wsManager = WebSocketManager.getInstance();

    if (wsManager.socket.readyState === WebSocket.OPEN) {
      wsManager.sendMessage({
        cmd: 1,
        data: calculateWheelDirections(x, y),
      });
    } else {
      console.error(
        'Cannot send message, WebSocket not open. Ready state is:',
        wsManager.socket.readyState,
      );
    }
    console.log(calculateWheelDirections(x, y));
  };

  const toggleVideo = () => {
    setVideo(!video);
  };

  const saveIpAddress = async () => {
    try {
      await AsyncStorage.setItem('carIpAddress', ipAddress);
      WebSocketManager.getInstance().updateIpAddress(ipAddress); // Update WebSocket connection with new IP
      Alert.alert('Success', 'IP address saved!');
    } catch (error) {
      console.error('Failed to save IP address:', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.ipInputContainer}>
        <TextInput
          style={styles.ipInput}
          placeholder={'Your current ip is: ' + mobileIpAddress}
          value={ipAddress}
          onChangeText={setIpAddress}
        />
        <Button title="Save" onPress={saveIpAddress} />
      </View>
      <View style={styles.alignJoystick}>
        <CustomJoystick onMove={handleMove} />
      </View>
      <View style={styles.alignHorn}>
        <CustomButton iconUrl={icons.horn} cmd={8} data={[1, 5000]} />
      </View>
      <View style={styles.alignVideo}>
        <CustomButton
          onPress={toggleVideo}
          iconUrl={video === true ? icons.videoOn : icons.videoOff}
          cmd={9}
          data={video === true ? 1 : 0}
        />
      </View>
      <View style={styles.alignVision}>
        <HugeButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#081624',
    position: 'relative',
  },
  ipInputContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ipInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  alignJoystick: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  alignVision: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  alignHorn: {
    position: 'absolute',
    bottom: 10,
    right: 130,
  },
  alignVideo: {
    position: 'absolute',
    bottom: 85,
    right: 110,
  },
});

export default App;
