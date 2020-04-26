import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  disabled,
  disableStyle,
  gradient = null,
  label,
  onPress,
  round = false,
  textStyle,
  style,
}) => {
  const handlePress = () => {
    if (disabled) {
      return false;
    }

    onPress();
  };

  if (!gradient || disabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
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

  if (gradient && disableStyle) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={[styles.buttonDisable, round && styles.buttonRounded, style]}>
        <Text style={[styles.buttonDisableText, textStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      start={gradient.start}
      end={gradient.end}
      colors={gradient.colors}
      style={[styles.button, round && styles.buttonRounded, style]}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00A5B8',
    justifyContent: 'center',
    height: 48,
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
