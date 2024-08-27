import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomButton, CustomJoystick, HugeButton } from './src/components';
import { icons } from './src/theme';

function App(): React.JSX.Element {
  const [video, setVideo] = useState(true);

  const handleMove = (x: number, y: number) => {
    console.log(`X: ${Math.round(x)}, Y: ${Math.round(y)}`);
  };

  const toggleVideo = () => {
    setVideo(!video);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
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
