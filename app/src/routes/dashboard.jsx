// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import MealIcon from "@material-ui/icons/Fastfood";


// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Meal from "views/Meal/Meal.jsx";
import Settings from "views/Settings/Settings.jsx";

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
    component: UserProfile
  },
  {
    path: "/meal",
    sidebarName: "Meal",
    navbarName: "Meal",
    icon: MealIcon,
    component: Meal
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Settings",
    icon: SettingsIcon,
    component: Settings
  },
  // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
