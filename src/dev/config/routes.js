import {
  faSignInAlt,
  faEdit,
  faBrowser,
  faPaintBrush,
  faPlus,
  faEquals,
  faHistory,
  faClock
} from "@fortawesome/pro-light-svg-icons";

export default [
  {
    name: "AppBar",
    icon: faEquals,
    layout: "admin",
    component: () => {
      return import("../views/AppBar");
    },
    group: "private",
    path: "/appBar"
  },
  {
    name: "Login",
    icon: faSignInAlt,
    layout: "emptyPage",
    component: () => {
      return import("../views/Authenticator");
    },
    props: { label: "page 1", primary: true },
    display: false,
    group: "public",
    path: "/login",
    aliasPath: ["/"]
  },
  {
    name: "Forms",
    icon: faEdit,
    layout: "admin",
    component: () => {
      return import("../views/Form");
    },
    props: { label: "page 2", primary: true },
    group: "private",
    path: "/forms"
  },
  {
    name: "Browser",
    icon: faBrowser,
    layout: "admin",
    component: () => {
      return import("../views/Browser");
    },
    group: "private",
    path: "/browser"
  },
  {
    name: "History",
    icon: faHistory,
    layout: "admin",
    component: () => {
      return import("../views/History");
    },
    group: "private",
    path: "/person/form"
  },
  {
    name: "Kunstwerke",
    icon: faPaintBrush,
    pending: true,
    type: "list",
    elements: [
      {
        name: "Alle",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/all"
      },
      {
        name: "Meine",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/my"
      },
      {
        name: "Gemietet",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/rent"
      },
      {
        icon: faPlus,
        name: "Neue Sammlung",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/rent"
      }
    ]
  },
  {
    name: "Stechuhr",
    icon: faClock,
    layout: "admin",
    component: () => {
      return import("../views/Timer");
    },
    group: "private",
    path: "/timer"
  }
];
