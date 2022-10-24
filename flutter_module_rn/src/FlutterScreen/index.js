import { ActivityIndicator, NativeEventEmitter, NativeModules, Platform, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const { FlutterModuleRn } = NativeModules;
const eventEmitter = new NativeEventEmitter(FlutterModuleRn);

const FlutterScreen = ({ startModuleValue, onCallback, onScreenClose }) => {
  useEffect(() => {
    FlutterModuleRn.startFlutterActivity(
      'setModule', 
      startModuleValue.toString(), 
      (text) => {
        console.log(text);
      }
    );
  }, [])
  useEffect(() => {
    const listener1 = eventEmitter.addListener('callBack', (event) => {
      onCallback(event);
    });
    const listener2 = eventEmitter.addListener('closeFlutterScreen', () => {
      onScreenClose();
    });
    return () => {
      listener1.remove();
      listener2.remove();
    }
  }, [onScreenClose])
  return (
    <View>
      <ActivityIndicator size="large" />
      <Text>Load module Flutter '{startModuleValue}' RN wrapper for Flutter '{Platform.OS}'!</Text>
    </View>
  )
}

export default FlutterScreen;
