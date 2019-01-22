// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import MealIcon from "@material-ui/icons/Fastfood";
import ContactIcon from "@material-ui/icons/ContactSupport";


// core components/views
import DashboardPage from "views/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Meal from "views/Meal";
import Contact from "views/Contact"
import Settings from "views/Settings";

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
  // { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
