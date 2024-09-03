import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { CustomButton, CustomJoystick, HugeButton } from './src/components';
import { WebSocketManager } from './src/services/websocketManager';
import { icons } from './src/theme';
import { calculateWheelDirections } from './src/utils/calculateWheelDirections';

function App(): React.JSX.Element {
  const [video, setVideo] = useState(true);
  const [canHorn, setCanHorn] = useState(true);

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

  const toggleHorn = () => {
    setCanHorn(!canHorn);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WebView
        source={{ uri: `http://192.168.70.50:7000` }}
        style={styles.videoStream}
      />
      <View style={styles.alignJoystick}>
        <CustomJoystick onMove={handleMove} />
      </View>
      <View style={styles.alignHorn}>
        {canHorn ? (
          <CustomButton
            iconUrl={icons.horn}
            cmd={7}
            data={1}
            onPress={toggleHorn}
          />
        ) : (
          <CustomButton
            iconUrl={icons.horn}
            cmd={7}
            data={0}
            onPress={toggleHorn}
          />
        )}
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
  videoStream: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
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
