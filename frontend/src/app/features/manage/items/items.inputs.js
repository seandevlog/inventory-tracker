import { itemSelections } from "@my-org/shared/validators/index.js";

const inputs = [
  { id: 'sku', type: 'text', autoComplete: false, label: 'SKU' },
  { id: 'name', type: 'text', autoComplete: false, label: 'Item Name' },
  { id: 'unit', type: 'text', autoComplete: false, label: 'Unit of Measure' },
  { id: 'category', type: 'radio', options: itemSelections.categories, autoComplete: false, label: 'Category' },
  { id: 'reorderPoint', type: 'text', autoComplete: false, label: 'Reorder Point' },
];

export default inputs;