import { itemSelections } from "@my-org/shared/validators/index.js";

const inputs = [
  { id: 'sku', type: 'text', autoComplete: 'off', label: 'SKU' },
  { id: 'name', type: 'text', autoComplete: 'off', label: 'Item Name' },
  { id: 'unit', type: 'text', autoComplete: 'off', label: 'Unit of Measure' },
  { id: 'reorderPoint', type: 'text', autoComplete: 'off', label: 'Reorder Point' },
  { id: 'category', type: 'status', options: itemSelections.category, label: 'Category' },
  { id: 'isActive', type: 'status', options: itemSelections.isActive, label: 'Status' },
];

export default inputs;