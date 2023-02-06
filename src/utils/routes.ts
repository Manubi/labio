export const Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  partners: "/partners",
  dashboard: {
    landing: "/dashboard",
    paper: { landing: "/dashboard/paper", add: "/dashboard/paper/add" },
    dao: {
      landing: "/dashboard/dao",
      add: "/dashboard/dao/add",
      find: "/dashboard/dao/find",
      member: "/dashboard/dao/member",
    },
    profile: { landing: "/dashboard/profile" },
    settings: "/dashboard/settings",
  },
};
