import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CustomJoystick } from './components/CustomJoystick';

function App(): React.JSX.Element {
  const [xCoo, setXCoo] = useState(0);
  const [yCoo, setYCoo] = useState(0);
  const handleMove = (x: number, y: number) => {
    console.log(`X: ${x}, Y: ${y}`);
    setXCoo(x);
    setYCoo(y);
  };
  return (
    <SafeAreaView style={styles.joystickContainer}>
      <CustomJoystick onMove={handleMove} />
      <View style={styles.cooContainer}>
        <Text>X: {xCoo}</Text>
        <Text>Y: {yCoo}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cooContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
  },
  joystickContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});

export default App;
