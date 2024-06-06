import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

interface CustomJoystickProps {
  onMove: (x: number, y: number) => void;
}

export const CustomJoystick = ({ onMove }: CustomJoystickProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        let newX = gestureState.dx;
        let newY = gestureState.dy;

        if (newX > 100) {
          newX = 100;
        }
        if (newX < -100) {
          newX = -100;
        }
        if (newY > 100) {
          newY = 100;
        }
        if (newY < -100) {
          newY = -100;
        }

        pan.setValue({ x: newX, y: newY });
        setPosition({ x: newX, y: newY });
        onMove && onMove(newX, newY * -1);
      },
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => {
          setPosition({ x: 0, y: 0 });
          onMove && onMove(0, 0);
        });
      },
    }),
  ).current;

  return (
    <View style={styles.joystickContainer}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.joystick, { transform: pan.getTranslateTransform() }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  joystickContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 50,
    height: 50,
    backgroundColor: '#888',
    borderRadius: 25,
  },
});
