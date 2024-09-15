import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebSocketManager } from '../../services/websocketManager';
import { CustomButtonProps } from './customButtonProps';

export const CustomButton: FC<CustomButtonProps> = ({
  iconUrl,
  cmd,
  data,
  title,
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
      {iconUrl && (
        <Image source={iconUrl} style={styles.iconStyle} resizeMode="contain" />
      )}
      {title && <Text style={styles.textStyles}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
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
