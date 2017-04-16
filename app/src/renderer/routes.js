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
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: require('pages/ContactsView')
      },
      {
        path: '/invitations',
        name: 'invitations',
        component: require('pages/InvitationsView')
      },
      {
        path: '/safezones',
        name: 'safezones',
        component: require('pages/SafezoneView')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
