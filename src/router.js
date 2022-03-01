import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './pages/Main';
import PostDetail from './pages/PostDetail';

Vue.use(VueRouter);

const route = [
  { path: "/", component: Main },
  {
    path: "/detail/:id",
    component: PostDetail,
    name: 'detail',
    props: true
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: route
});

export default router;

