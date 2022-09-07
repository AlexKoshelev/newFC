import NavBar from "./components/ui/navBar";
import Users from "../layouts/users";
import Main from "../layouts/main";
import Login from "../layouts/login";
import { Route, Switch, Redirect } from "react-router-dom";
const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/layouts/users/:userId?" component={Users} />
        <Route path="/layouts/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
export default App;
