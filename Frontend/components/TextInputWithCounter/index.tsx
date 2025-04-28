import React, { useState } from 'react';

import { StyleSheet, Text, TextBase, View } from 'react-native';

import { HelperText, TextInput as PaperInput } from 'react-native-paper';
import { beautyTheme } from 'theme/theme';

import { TextInputWithCounterProps } from './type';

const {
  colors: { secondary, white, onPrimaryContainer, outline },
} = beautyTheme;

const Input: React.FC<TextInputWithCounterProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur = () => {},
  onFocus = () => {},
  maxLength,
  multiline = false,
  style = {},
  keyboardType = 'default',
  errorMessage,
  isPassword = false,
  withCounter = true,
}) => {
  const [isSecureText, setIsSecureText] = useState(isPassword);

  const toggleSecureText = () => {
    setIsSecureText((prev) => !prev);
  };

  return (
    <View style={[styles.inputWrapper, style]}>
      <PaperInput
        style={styles.input}
        label={label}
        error={Boolean(errorMessage)}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={(v) => onBlur(v.nativeEvent.text)}
        maxLength={maxLength}
        multiline={multiline}
        keyboardType={keyboardType}
        mode="outlined"
        secureTextEntry={isSecureText}
        right={
          isPassword ? (
            <PaperInput.Icon
              icon={isSecureText ? 'eye-off' : 'eye'}
              onPress={toggleSecureText}
              size={20}
              color={secondary}
            />
          ) : undefined
        }
      />
      {Boolean(value?.length && maxLength && withCounter) && (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      )}
      {errorMessage && (
        <HelperText type="error" visible>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 50,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: white,
    color: onPrimaryContainer,
    borderColor: outline,
    position: 'relative',
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  counter: {
    fontSize: beautyTheme.fontSizes.small,
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
});

export default Input;
