import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import Todo from './screens/todo';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" />
      <Todo />
    </NativeBaseProvider>
  );
}
