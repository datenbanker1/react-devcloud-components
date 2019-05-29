import React from "react";
import Button from "../../components/Buttons/Button";
import {
  faEdit,
  faBrowser,
  faList,
  faPlus,
  faEquals,
  faHistory,
  faExpand,
  faClock
} from "@fortawesome/pro-light-svg-icons";

const routes = [
  {
    component: () => {
      return import("../views/AppBar");
    },
    paths: ["/appBar"]
  },
  {
    component: () => {
      return import("../views/Authenticator");
    },
    paths: ["/login"]
  },
  {
    component: () => {
      return import("../views/Form");
    },
    paths: ["/forms/:id", "/"]
  },
  {
    component: () => {
      return import("../views/Browser");
    },
    paths: ["/browser"]
  },
  {
    component: () => {
      return import("../views/History");
    },
    paths: ["/person/form"]
  },
  {
    component: () => {
      return import("../views/Modal");
    },
    paths: ["/modals"]
  },
  {
    component: () => {
      return import("../views/Timer");
    },
    paths: ["/timer"]
  },
  {
    component: () => {
      return import("../views/Timer");
    },
    paths: ["/art/:id"]
  }
];
const links = [
  {
    label: "AppBar",
    icon: faEquals,
    path: "/appBar"
  },
  {
    title: "Formulare",
    label: "Forms",
    icon: faEdit,
    breadCrumbs: [
      { title: "Form", link: "/forms" },
      { title: "Test", link: "/forms" }
    ],
    path: "/forms/all",
    originalPaths: ["/forms/:id", "/"]
  },
  {
    label: "Browser",
    icon: faBrowser,
    path: "/browser",
    actions: <Button>Test</Button>
  },
  {
    label: "History",
    icon: faHistory,
    path: "/person/form"
  },
  {
    label: "Modals",
    icon: faExpand,
    path: "/modals"
  },
  {
    label: "Stechuhr",
    icon: faClock,
    path: "/timer"
  },
  {
    label: "Liste",
    icon: faList,
    subMenu: {
      onOpen: () => ({ type: "OPEN_SUB_MENU" }),
      onClose: () => ({ type: "CLOSE_SUB_MENU" }),
      show: true,
      pending: false,
      links: [
        {
          label: "Link 1",
          path: "/art/all"
        },
        {
          label: "Link 2",
          path: "/art/my"
        },
        {
          label: "Link 3",
          path: "/art/rent"
        },
        {
          icon: faPlus,
          label: "Neuen Link",
          path: "/art/rent"
        }
      ]
    }
  }
];
export { routes, links };
