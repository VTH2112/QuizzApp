import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MainStack from './src/navigations/MainStack';
import AuthStack from './src/navigations/AuthStack';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer >
        {/* <AuthStack /> */}
        <MainStack />
      </NavigationContainer>
    </Provider>
  )
}