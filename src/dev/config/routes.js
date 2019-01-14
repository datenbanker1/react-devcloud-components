import { faSignInAlt, faEdit } from "@fortawesome/pro-light-svg-icons";

export default [
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
  }
];
