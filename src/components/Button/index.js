import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  disabled,
  gradient = null,
  label,
  onPress,
  round = false,
  textStyle,
  style,
}) => {
  if (!gradient || disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          !disabled ? styles.button : styles.buttonDisable,
          round && styles.buttonRounded,
          style,
        ]}>
        <Text
          style={[
            !disabled ? styles.buttonText : styles.buttonDisableText,
            textStyle,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      start={gradient.start}
      end={gradient.end}
      colors={gradient.colors}
      style={[styles.button, round && styles.buttonRounded, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 48,
    backgroundColor: 'purple',
    width: 130,
  },
  buttonRounded: {
    borderRadius: 24,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonDisable: {
    justifyContent: 'center',
    height: 48,
    backgroundColor: 'lightgray',
    width: 130,
  },
  buttonDisableText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
});

export default Button;
