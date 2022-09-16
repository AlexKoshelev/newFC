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
        <Route path="/layouts/users/:userId?/:edit?" component={Users} />
        {/*Если есть id, то компонент userPage, если есть и id и editUser, то EditUser, иначе UserListPage */}
        <Route path="/layouts/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
export default App;
