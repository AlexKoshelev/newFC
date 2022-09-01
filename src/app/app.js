import NavBar from "./components/navBar";
import Users from "../layouts/users";
import Main from "../layouts/main";
import Login from "../layouts/login";
import { Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/layouts/main" component={Main} />
        <Route path="/layouts/login" component={Login} />
        <Route path="/layouts/users/:userId?" component={Users} />
      </Switch>
    </div>
  );
};
export default App;
