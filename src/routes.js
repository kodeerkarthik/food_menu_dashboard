import Category from "views/Category.js";
import ItemsPage from "views/ItemsPage.js";
import TodaySpecial from "views/TodaySpecial.js";
import UserPage from "views/UserPage.js";

var dashRoutes = [
  {
    path: "/user-page",
    name: "Details / Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Add Category",
    icon: "business_globe",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/items",
    name: "items",
    icon: "design-2_ruler-pencil",
    component: ItemsPage,
    layout: "/admin",
  },
  {
    path: "/todaySpl",
    name: "today's special",
    icon: "location_map-big",
    component: TodaySpecial,
    layout: "/admin",
  },

];
export default dashRoutes;
