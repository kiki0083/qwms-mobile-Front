const routes = [
  {
    path: "/err404",
    name: "ERROR404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  //로그인 페이지
  {
    path: "/",
    component: () => import("layouts/LogIn.vue"),
  },
  //메인화면
  {
    path: "/main",
    name: "MainLayout",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("pages/sample/Chart.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "ERROR404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
