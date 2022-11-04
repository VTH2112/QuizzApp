import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomeStack from './src/navigations/HomeStack';
import AuthStack from './src/navigations/AuthStack';
import api from './src/api/api';

export default function App() {
  React.useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    try {
      const res = await api.get('/john%203:16');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer >
        <AuthStack />
        {/* <HomeStack /> */}
      </NavigationContainer>
    </Provider>
  )
}