import NavBar from "./components/ui/navBar";
import Users from "../layouts/users";
import Main from "../layouts/main";
import Login from "../layouts/login";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/layouts/users/:userId?/:edit?" component={Users} />
              {/*Если есть id, то компонент userPage, если есть и id и editUser, то EditUser, иначе UserListPage */}
              <Route path="/layouts/login/:type?" component={Login} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};
export default App;
