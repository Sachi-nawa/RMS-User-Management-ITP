import './App.css';
import AddCus from './components/AddCus';
import Header from './components/Header';
import AllCus from './components/AllCus';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import UpdateF  from './components/UpdateF';
import Register from './components/Register';
import Log from './components/Log';
import Dashboard from './components/Dashboard';
import MyAccount from './components/MyAccount';
import OrderHistory from './components/OrderHistory';
import PaymentHistory from './components/PaymentHistory';

function App() {
  return (
    <Router>
   
  <div>
    <Header/>
    <Routes>
    
    <Route path="/add" exact Component={AddCus}></Route>
    <Route path="/" exact Component={AllCus}></Route>
    <Route path ="/update/:id" exact Component={UpdateF}></Route>
    <Route path="/register" exact Component={Register}></Route>
    <Route path="/login" exact Component={Log}></Route>
    <Route path="/dashboard/:email" exact Component={Dashboard}></Route>
    <Route path="/MyAccount/:email" exact Component={MyAccount}></Route>
    <Route path="/orderhistory" exact Component={OrderHistory}></Route>
    <Route path="/paymenthistory" exact Component={PaymentHistory}></Route>
    
    
    </Routes>
  </div>
 
  </Router>
  );
}

export default App;