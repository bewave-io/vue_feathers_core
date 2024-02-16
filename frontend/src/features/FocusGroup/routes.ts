export default [
  {
    path: '/',
    component: () => import('@f/Global/layouts/MainLayout.vue'),
    children: [
      {
        name: 'focus-groups',
        path: 'focus-groups',
        component: () => import('./components/FocusGroupTest.vue'),
      },
    ],
  },
];
