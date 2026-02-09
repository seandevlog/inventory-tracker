const config = {
  server: import.meta.env.VITE_API_URL,
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