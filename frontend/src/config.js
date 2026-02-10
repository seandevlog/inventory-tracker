const config = {
  server: import.meta.env.VITE_API_URL,
  path: {
    root: '/',

    app: 'app',

    register: {
      relative: 'register',
      absolute: '/register'
    },

    manage: {
      relative: 'manage',
      absolute: '/app/manage'
    },
    profile: {
      relative: 'profile',
      absolute: '/app/profile'
    },
    faq: {
      relative: 'faq',
      absolute: '/app/faq',
    },
    items: {
      relative: 'items',
      absolute: '/app/manage/items'
    },
    locations: {
      relative: 'locations',
      absolute: '/app/manage/locations'
    },
    orders: {
      relative: 'orders',
      absolute: '/app/manage/orders'
    },
    suppliers: {
      relative: 'suppliers',
      absolute: '/app/manage/suppliers'
    },
    transactions: {
      relative: 'transactions',
      absolute: '/app/manage/transactions'
    },
    users: {
      relative: 'users',
      absolute: '/app/manage/users'
    },

    logout: {
      relative: 'logout',
      absolute: '/app/logout'
    }
  }
};

export default config;