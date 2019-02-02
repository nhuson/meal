// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import MealIcon from "@material-ui/icons/Fastfood";
import ContactIcon from "@material-ui/icons/ContactSupport";
import LogoutIcon from "@material-ui/icons/AssignmentReturn";


// core components/views
import DashboardPage from "views/dashboard";
import User from "containers/UserContainer";
import Meal from "containers/meal/MainContainer";
import Contact from "containers/ContactContainer"
import Settings from "containers/SettingsContainer"
import Logout from "containers/auth/LogoutContainer"

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Meal Dashboard",
    icon: DashboardIcon,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User",
    navbarName: "User",
    icon: PersonIcon,
    component: User
  },
  {
    path: "/meal",
    sidebarName: "Meal",
    navbarName: "Meal",
    icon: MealIcon,
    component: Meal
  },
  {
    path: "/contact",
    sidebarName: "Contact",
    navbarName: "Contact",
    icon: ContactIcon,
    component: Contact
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: SettingsIcon,
    component: Settings
  },
  { 
    path: "/logout", 
    sidebarName: "Logout",
    navbarName: "Logout",
    icon: LogoutIcon,
    component: Logout
  }
];

export default dashboardRoutes;
