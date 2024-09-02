import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { WebSocketManager } from '../../services/websocketManager';
import { CustomButtonProps } from './customButtonProps';

export const CustomButton: React.FC<CustomButtonProps> = ({
  iconUrl,
  cmd,
  data,
  onPress,
}) => {
  const handlePress = () => {
    const message = {
      cmd: cmd,
      data: data,
    };

    const wsManager = WebSocketManager.getInstance();

    if (wsManager.socket.readyState === WebSocket.OPEN) {
      wsManager.sendMessage(message);
    } else {
      console.error(
        'Cannot send message, WebSocket not open. Ready state is:',
        wsManager.socket.readyState,
      );
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchableStyle}>
      <Image source={{ uri: iconUrl.toString() }} style={styles.iconStyle} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#081624',
    padding: 15,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
