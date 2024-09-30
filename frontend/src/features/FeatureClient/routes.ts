export default [
  {
    path: "/features/client",
    component: () => import("../Global/layouts/MainLayout.vue"),
    meta: { public: true },
    children: [
      {
        name: "feature-client",
        path: "",
        component: () => import("./components/VueClient.vue"),
      },
    ],
  },
];
