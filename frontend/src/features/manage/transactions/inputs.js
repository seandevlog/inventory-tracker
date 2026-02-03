import { transactionSelections } from "@my-org/shared/validators/index.js";

const inputs = ({ locations, items, username }) => 
[
  { 
    id: 'type', 
    type: 'select', 
    options: transactionSelections.type, 
    label: 'Transaction Type' 
  },
  { 
    id: 'sku', 
    type: 'select', 
    options: items ? items.filter(({isActive}) => (isActive && isActive === 'active')).map(({sku}) => sku): [], 
    label: 'Item' 
  },
  { 
    id: 'qty', 
    type: 'text', 
    autoComplete: 'off', 
    label: 'Quantity' 
  },
  { 
    id: 'fromLocationCode', 
    type: 'select', 
    options: locations ? locations.map(({code}) => code): [], 
    label: 'From Location' 
  },
  { 
    id: 'toLocationCode', 
    type: 'select', 
    options: locations ? locations.map(({code}) => code): [], 
    label: 'To Location' 
  },
  { 
    id: 'unitCost', 
    type: 'text', 
    autoComplete: 'off', 
    label: 'Unit Cost' 
  },
  { 
    id: 'note', 
    type: 'text', 
    autoComplete: 'off', 
    label: 'Notes' 
  },
  { 
    id: 'createdBy', 
    type: 'text', 
    autoComplete: 'off', 
    label: 'Created By', 
    disabled: true, 
    defaultValue: username
  },
  { 
    id: 'createdAt', 
    type: 'date', 
    autoComplete: 'off', 
    label: 'Date Created', 
    disabled: true 
  },
  { 
    id: 'updatedAt', 
    type: 'date', 
    autoComplete: 'off', 
    label: 'Date Updated', 
    disabled: true 
  }
];

export default inputs;