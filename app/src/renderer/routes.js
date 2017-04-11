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
        path: '/profile',
        name: 'profile',
        component: require('pages/ProfileView')
      }
      // ,
      // {
      //   path: '/contacts',
      //   name: 'contacts',
      //   component: require('pages/ContactsView')
      // }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
