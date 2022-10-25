import * as React from 'react';

interface FlutterModuleRn {
  startFlutterActivity: (initialEvent: string, args: string, callback: (text: string) => void) => void;
  sendEvent: (event: string, args?: string) => void;
}

interface FlutterScreenProps {
  onCallback: (value: string) => void;
  onScreenClose: () => void;
  startModuleValue: string;
}

declare const FlutterScreen: React.FC<FlutterScreenProps>

export default FlutterScreen
