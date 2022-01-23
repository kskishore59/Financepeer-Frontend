import {Route, Switch} from 'react-router-dom'


import Login  from './components/LoginForm';
import Home from './components/MainComponent';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp'



import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
