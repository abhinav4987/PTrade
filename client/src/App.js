import './App.css';
import Registration from './components/Registration'
import UserDashBoard from './components/DashBoard/UserDashBoard';
import ZerodhaLogin from './components/ZerodhaLogin/index';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Switch>
      <Route path="/auth">
        <Registration />
      </Route>
      <Route path="/zerodhaLogin">
        <ZerodhaLogin />
      </Route>
      <Route path="/dashBoard">
        <UserDashBoard />
      </Route>
    </Switch>
  );
}

export default App;


// <div className="App">
//       <Registration />
//     </div>