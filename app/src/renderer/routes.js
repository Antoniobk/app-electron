export default [
  {
    path: '/',
    name: 'sing-view',
    component: require('pages/SingView')
  },
  {
    path: '/app',
    name: 'base',
    component: require('components/BaseView'),
    children: [
      {
        path: 'profile',
        component: require('pages/ProfileView')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
