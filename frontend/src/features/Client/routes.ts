export default [
  {
    path: "/clients",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "client-list",
        path: "/clients",
        component: () => import("./components/ClientListView.vue"),
      },
    ],
  },
];
