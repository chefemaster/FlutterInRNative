import React, { useCallback, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlutterScreen } from 'flutter-module-rn';
import RootStackParamList from '../components/rootStackParamList';
export default function FlutterScreenWrapper({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Flutter'>) {
  const [data, setData] = useState<string>('');
  const onCallback = (value: string) => {
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
