/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlutterScreen } from 'flutter-module-rn';

type RootStackParamList = {
  Home: { data: Object };
  Flutter: { startModuleValue: string };
};

function FlutterScreenWrapper({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Flutter'>) {
  const [data, setData] = useState<Object>({});
  const onCallback = (value: Object) => {
    console.log(`onCallback: ${value}`);
    setData(value);
  };
  const onScreenClose = useCallback(() => {
    console.log(`onScreenClose: ${data}`);
    navigation.navigate({ name: 'Home', params: { data }, merge: true });
  }, [data, navigation]);
  return (
    <FlutterScreen
      startModuleValue={route.params.startModuleValue}
      onCallback={onCallback}
      onScreenClose={onScreenClose}
    />
  );
}
export default FlutterScreenWrapper;
