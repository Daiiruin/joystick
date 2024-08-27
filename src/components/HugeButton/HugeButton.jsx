import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { icons } from '../../theme';

export const HugeButton = () => {
  return (
    <View style={styles.viewStyled}>
      <TouchableOpacity style={[styles.buttonStyle, styles.alignTop]}>
        <Image source={icons.arrowUp} style={styles.iconStyleH} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle, styles.alignRight]}>
        <Image source={icons.arrowRight} style={styles.iconStyleV} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle, styles.alignBottom]}>
        <Image source={icons.arrowDown} style={styles.iconStyleH} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle, styles.alignLeft]}>
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
