import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topnav from './components/layouts/topnav'
import EMPSideNav from './components/layouts/EMPsidenav'
import AddEmployee from './components/employee/AddEmployee'
import ViewEmployees from './components/employee/ViewAllEmployees'
import ViewOneEmployee from './components/employee/ViewOneEmployee'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'
import AddLeaveEmployee from './components/leaveEmployee/AddLeaveEmployee'
import ViewLeaveEmployees from './components/leaveEmployee/ViewLeaveEmployees'
import ViewLeaveOneEmployee from './components/leaveEmployee/ViewLeaveOneEmployee'


function App() {
  return (
    <BrowserRouter>

      <Route path = "/"><Topnav/></Route>

      {/* Employee Manager Routes */}
      <Route path = "/employeeManager"><EMPSideNav/></Route>
      <Route exact path = "/employeeManager/add"><AddEmployee/></Route>
      <Route exact path = "/employeeManager/view"><ViewEmployees/></Route>
      <Route exact path = "/employeeManager/view/:id"><ViewOneEmployee/></Route>
      <Route exact path = "/employeeManager/salary/add"><AddSalary/></Route>
      <Route exact path = "/employeeManager/salary/view"><ViewSalary/></Route>
      <Route exact path = "/employeeManager/leave/add"><AddLeaveEmployee/></Route>
      <Route exact path = "/employeeManager/leave/view"><ViewLeaveEmployees/></Route>
      <Route exact path = "/employeeManager/leave/view/:id"><ViewLeaveOneEmployee/></Route>

    </BrowserRouter>
  );
}

export default App;
