import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WareHouseList from './components/WareHouseList/WareHouseList';
import WareHouseDetail from './components/WareHouseDetail/WareHouseDetail';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { warehouseReducer } from './Reducers/warehouseReducer';

const store = createStore(warehouseReducer);

function App() {
  return (
    <>
     <Provider store={store}>
       <Router>
      <Switch>
      <Route exact path="/" component={WareHouseList} />
      <Route exact path="/details" component={WareHouseDetail} />
      </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default App;
