import IndexPage from '../pages/IndexPage.vue'
import ErrorNotFound from '../pages/ErrorNotFound.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: () => MainLayout,
    children: [{ path: '', component: () => IndexPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => ErrorNotFound,
  },
]

export default routes
