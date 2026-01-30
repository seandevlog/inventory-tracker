import { orderSelections } from "@my-org/shared/validators/index.js";

const inputs = ({ suppliers, items }) => 
[
  { id: '_id', type: 'text', autoComplete: 'off', label: 'Order ID', disabled: true },
  { id: 'email', type: 'select', options: suppliers ? suppliers.map(({email}) => email): [], label: 'Supplier' },
  { id: 'sku', type: 'select', options: items ? items.filter(({isActive}) => isActive === 'active').map(({sku}) => sku): [], label: 'Item' },
  { id: 'status', type: 'select', options: orderSelections.status, label: 'Status' },
  { id: 'qty', type: 'text', autoComplete: 'off', label: 'Quantity' },
  { id: 'unitCost', type: 'text', autoComplete: 'off', label: 'Unit Cost' },
  { id: 'createdAt', type: 'date', autoComplete: 'off', label: 'Date Created', disabled: true },
  { id: 'updatedAt', type: 'date', autoComplete: 'off', label: 'Date Updated', disabled: true },
];

export default inputs;