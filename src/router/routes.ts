export const routes = [
  { path: '/', component: async () => await import('@/pages/Home.vue') },
  { path: '/Rolladen', component: async () => await import('@/pages/Rolladen.vue') },
  { path: '/:pathMatch(.*)', component: async () => await import('@/pages/error/ErrorPageNotFound.vue') }
]
