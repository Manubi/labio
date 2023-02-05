export const Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: {
    landing: "/dashboard",
    paper: { landing: "/dashboard/paper", add: "/dashboard/paper/add" },
    dao: { landing: "/dashboard/dao", add: "/dashboard/dao/add" },
    profile: { landing: "/dashboard/profile" },
    settings: "/dashboard/settings",
  },
};
