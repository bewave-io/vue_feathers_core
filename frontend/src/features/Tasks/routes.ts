export default [
  {
    path: "/tasks",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "task-list",
        path: "/tasks",
        component: () => import("./components/TaskList.vue"),
      },
    ],
  },
];
