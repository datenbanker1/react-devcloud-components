import React from "react";
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
    path: "/login"
  },
  {
    protected: true,
    name: "Forms",
    icon: faEdit,
    layout: "admin-extended",
    breadCrumbs: [
      { title: "Form", link: "/forms" },
      { title: "Test", link: "/forms" }
    ],
    layoutProps: {
      logo: <p>Test logo</p>,
      sideBar: <p>Test sideBar</p>,
      backgroundColor: "#000"
    },
    component: () => {
      return import("../views/Form");
    },
    props: { label: "page 2", primary: true },
    path: "/forms/:id",
    defaultParams: { id: "all" },
    aliasPath: ["/"]
  },
  {
    name: "Browser",
    icon: faBrowser,
    layout: "admin",
    component: () => {
      return import("../views/Browser");
    },
    path: "/browser"
  },
  {
    name: "History",
    icon: faHistory,
    layout: "admin",
    component: () => {
      return import("../views/History");
    },
    path: "/person/form"
  },
  {
    name: "Modals",
    icon: faExpand,
    layout: "admin",
    component: () => {
      return import("../views/Modal");
    },
    path: "/modals"
  },
  {
    name: "Stechuhr",
    protected: true,
    icon: faClock,
    layout: "admin-extended",
    layoutProps: {
      logo: <p>Test logo</p>,
      sideBar: <p>Test sideBar</p>
    },
    component: () => {
      return import("../views/Timer");
    },
    path: "/timer"
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
        path: "/art/all"
      },
      {
        name: "Link 2",
        layout: "admin",
        component: () => {},
        path: "/art/my"
      },
      {
        name: "Link 3",
        layout: "admin",
        component: () => {},
        path: "/art/rent"
      },
      {
        icon: faPlus,
        name: "Neuen Link",
        layout: "admin",
        component: () => {},
        path: "/art/rent"
      }
    ]
  }
];
