import {createStore, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

let oldData={
    expence:[],
    income:[]
};
function dataSection(Data = oldData , nyaData){
  if(nyaData.type == 'ADD_AMOUNT'){
    if(nyaData.payload.amount>0){
    Data.income.push(nyaData.payload);
  }else{
    Data.expence.push(nyaData.payload)
  }
}else if(nyaData.type=="DELETE_DETAIL"){
  Data.income.splice(nyaData.meraIndex, 1);
}else if(nyaData.type=="DELETE_DETAIL_EXP"){
  Data.expence.splice(nyaData.meraIndex, 1);
}else if(nyaData.type=="persist/REHYDRATE"){
         return nyaData.payload.dataSection;
     }

  return {income:[...Data.income], expence:[...Data.expence]}

};

let bigStore = combineReducers({dataSection});

const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, bigStore);

  export let meraStore = createStore(persistedReducer);

export let persistor = persistStore(meraStore);