import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebSocketManager } from '../../services/websocketManager';
import { icons } from '../../theme';

export const HugeButton = () => {
  // États pour stocker les angles verticaux et horizontaux
  const [angleVertical, setAngleVertical] = useState(90);
  const [angleHorizontal, setAngleHorizontal] = useState(90);

  // Fonction pour envoyer des données via WebSocket
  const sendWebSocketMessage = (cmd, data) => {
    const message = { cmd, data };
    const wsManager = WebSocketManager.getInstance();

    if (wsManager.socket.readyState === WebSocket.OPEN) {
      wsManager.sendMessage(message);
    } else {
      console.error(
        'Cannot send message, WebSocket not open. Ready state is:',
        wsManager.socket.readyState,
      );
    }
  };

  // Gestionnaires de clic pour chaque direction
  const handleRightPress = () => {
    if (angleVertical > 0) {
      const newAngle = Math.max(angleVertical - 20, 0);
      setAngleVertical(newAngle);
      sendWebSocketMessage(3, [newAngle, angleHorizontal]);
    }
  };

  const handleLeftPress = () => {
    if (angleVertical < 180) {
      const newAngle = Math.min(angleVertical + 20, 180);
      setAngleVertical(newAngle);
      sendWebSocketMessage(3, [newAngle, angleHorizontal]);
    }
  };

  const handleUpPress = () => {
    if (angleHorizontal < 180) {
      const newAngle = Math.min(angleHorizontal + 20, 180);
      setAngleHorizontal(newAngle);
      sendWebSocketMessage(3, [angleVertical, newAngle]);
    }
  };

  const handleDownPress = () => {
    if (angleHorizontal > 0) {
      const newAngle = Math.max(angleHorizontal - 20, 0);
      setAngleHorizontal(newAngle);
      sendWebSocketMessage(3, [angleVertical, newAngle]);
    }
  };

  return (
    <View style={styles.viewStyled}>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.alignTop]}
        onPress={handleUpPress}>
        <Image source={icons.arrowUp} style={styles.iconStyleH} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.alignRight]}
        onPress={handleRightPress}>
        <Image source={icons.arrowRight} style={styles.iconStyleV} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.alignBottom]}
        onPress={handleDownPress}>
        <Image source={icons.arrowDown} style={styles.iconStyleH} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.alignLeft]}
        onPress={handleLeftPress}>
        <Image source={icons.arrowLeft} style={styles.iconStyleV} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyled: {
    width: 100,
    height: 100,
    backgroundColor: '#081624',
    borderColor: '#fff',
    borderWidth: 2,
    position: 'relative',
    borderRadius: 100 / 2,
  },
  iconStyleH: {
    width: 25,
    height: 14,
    margin: 5,
  },
  iconStyleV: {
    width: 14,
    height: 25,
    margin: 5,
  },
  buttonStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  alignRight: {
    position: 'absolute',
    right: 0,
    top: 31,
  },
  alignLeft: {
    position: 'absolute',
    left: 0,
    top: 31,
  },
  alignTop: {
    position: 'absolute',
    top: 0,
    left: 31,
  },
  alignBottom: {
    position: 'absolute',
    bottom: 0,
    left: 31,
  },
});
