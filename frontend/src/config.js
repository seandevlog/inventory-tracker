const config = {
  server: import.meta.env.PROD ? '/api' : `${import.meta.env.VITE_API_URL}/api`,
  path: {
    root: '/',

    auth: {
      relative: 'auth',
      absolute: '/auth'
    },

    register: {
      relative: 'register',
      absolute: '/auth/register'
    },
    logout: {
      relative: 'logout',
      absolute: '/auth/logout'
    },

    manage: {
      relative: 'manage',
      absolute: '/manage'
    },
    profile: {
      relative: 'profile',
      absolute: '/profile'
    },
    faq: {
      relative: 'faq',
      absolute: '/faq',
    },

    dashboard: {
      relative: 'dashboard',
      absolute: '/manage/dashboard'
    },
    items: {
      relative: 'items',
      absolute: '/manage/items'
    },
    locations: {
      relative: 'locations',
      absolute: '/manage/locations'
    },
    orders: {
      relative: 'orders',
      absolute: '/manage/orders'
    },
    suppliers: {
      relative: 'suppliers',
      absolute: '/manage/suppliers'
    },
    transactions: {
      relative: 'transactions',
      absolute: '/manage/transactions'
    },
    users: {
      relative: 'users',
      absolute: '/manage/users'
    },
  }
};

export default config;