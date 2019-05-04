import {
  faSignInAlt,
  faEdit,
  faBrowser,
  faList,
  faPlus,
  faEquals,
  faHistory,
  faExpand,
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
    path: "/login"
  },
  {
    protected: true,
    name: "Forms",
    icon: faEdit,
    layout: "admin",
    component: () => {
      return import("../views/Form");
    },
    props: { label: "page 2", primary: true },
    group: "private",
    path: "/forms",
    aliasPath: ["/"]
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
    name: "Modals",
    icon: faExpand,
    layout: "admin",
    component: () => {
      return import("../views/Modal");
    },
    group: "private",
    path: "/modals"
  },
  {
    name: "Liste",
    icon: faList,
    pending: true,
    type: "list",
    elements: [
      {
        name: "Link 1",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/all"
      },
      {
        name: "Link 2",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/my"
      },
      {
        name: "Link 3",
        layout: "admin",
        component: () => {},
        group: "private",
        path: "/art/rent"
      },
      {
        icon: faPlus,
        name: "Neuen Link",
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
