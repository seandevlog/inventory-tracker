import { itemSelections } from "@my-org/shared/validators/index.js";

const inputs = [
  { id: 'sku', type: 'text', autoComplete: 'off', label: 'SKU' },
  { id: 'name', type: 'text', autoComplete: 'off', label: 'Item Name' },
  { id: 'unit', type: 'text', autoComplete: 'off', label: 'Unit of Measure' },
  { id: 'reorderPoint', type: 'text', autoComplete: 'off', label: 'Reorder Point' },
  { id: 'category', type: 'select', options: itemSelections.category, label: 'Category' },
  { id: 'isActive', type: 'select', options: itemSelections.isActive, label: 'Status' },
  { id: 'createdAt', type: 'date', autoComplete: 'off', label: 'Date Created', disabled: true },
  { id: 'updatedAt', type: 'date', autoComplete: 'off', label: 'Date Updated', disabled: true },
];

export default inputs;