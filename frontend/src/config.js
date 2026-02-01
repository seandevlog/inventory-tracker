const config = {
  server: import.meta.env.VITE_SERVER,
  path: {
    items: 'items',
    locations: 'locations',
    orders: 'orders',
    suppliers: 'suppliers',
    transactions: 'transactions',
    users: 'users'
  }
};

export default config;