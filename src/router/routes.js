
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'login', component: () => import('pages/users/Login.vue'),
      },
      {
        path: 'ventes_du_jour', component: () => import('pages/ventes/VenteDuJour.vue'),
      },
      {
        path: 'rapports', component: () => import('pages/ventes/RapportMensuel.vue'),
      }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
