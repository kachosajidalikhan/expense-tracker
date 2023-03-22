import logo from './logo.svg';
import './App.css';
import Home from './component/home/home';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, meraStore } from './store/store';
import { Provider } from 'react-redux';
import Transaction from './component/transectionDetail/transaction';

function App() {
  return (
      <Provider store={meraStore}>
    <PersistGate loading={null} persistor={persistor}>
    <Home/> 
    {/* <Transaction/> */}
    </PersistGate>
    </Provider>
  );
}

export default App;
