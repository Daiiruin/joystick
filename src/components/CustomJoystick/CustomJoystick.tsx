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
        const limit = 75; // (150px / 2)

        // Limiter les mouvements à 75px
        if (newX > limit) {
          newX = limit;
        }
        if (newX < -limit) {
          newX = -limit;
        }
        if (newY > limit) {
          newY = limit;
        }
        if (newY < -limit) {
          newY = -limit;
        }

        // Transformer les 75px en 100px
        const transformXto100 = (newX / limit) * 100; // transformer en -100 à 100
        const transformYto100 = (newY / limit) * 100; // transformer en -100 à 100

        pan.setValue({ x: newX, y: newY });
        setPosition({ x: newX, y: newY });
        onMove && onMove(transformXto100, transformYto100 * -1);
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
    width: 150,
    height: 150,
    backgroundColor: '#173b5e8a',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joystick: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
});
