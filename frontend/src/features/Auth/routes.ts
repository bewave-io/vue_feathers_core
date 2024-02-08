export default [
  {
    path: "/auth",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "auth-login",
        path: "/auth/login",
        component: () => import("./components/LoginPage.vue"),
      },
      {
        name: "auth-signup",
        path: "/auth/signup",
        component: () => import("./components/SignupPage.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "user-list",
        path: "/users/",
        component: () => import("../Auth/components/UserListPage.vue"),
      },
    ],
  },
];
