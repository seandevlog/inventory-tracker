# Minimum Viable Product

---

## MVP Scope

### Roles
- **Admin**  
  - Full access to all features  
  - Can manage Users (CRUD) and master data  
  - Can perform all stock transactions (including negative adjustments)
- **Manager**
  - Can view Users under their own department
  - Can approve/reject requests
  - Can perform changes to master data
- **Staff**  
  - Can perform stock transactions, create POs, view reports  
  - Read-only access to master data (Items, Locations, Suppliers)

---

### Core Entities
- **User**: `{ username, password, givenName, familyName, contact, address, passwordHash, role: 'admin'| 'manager ' | 'staff', isActive }`
- **Item**: `{ sku, name, unit, category?, reorderPoint, isActive }`
- **Location**: `{ code, name, notes? }`
- **Supplier**: `{ name, email?, phone?, address? }`
- **PurchaseOrder**: `{ orderId, supplierId, status, itemId, qty, unitCost }`
- **InventoryTransaction**: `{ type, itemId, qty, fromLocationId?, toLocationId?, unitCost?, note, createdBy, createdAt }`

---

### Must-Have Flows
1. **Authentication**: Login with JWT, role-based permissions
2. **Authorization**: Login should only allow active users
2. **Users CRUD**: Managers can only view their department's data
3. **Items CRUD**
4. **Locations CRUD**
5. **Suppliers CRUD**
6. **Purchase Orders**: create, update, partial/full receive
7. **Stock Transactions**: receive, issue, transfer, adjust
8. **View Stock**: by item/location
9. **Low-Stock Report**: `onHand <= reorderPoint`
10. **Transaction Log**: filter by type, item, date

---

### Acceptance Criteria
- **Auth & Roles**: Admin can manage users; Staff cannot  
- **Users CRUD**: Admin can create, update, deactivate users (returns `tempPassword` in dev)  
- **Stock Accuracy**: Transactions update on-hand counts correctly  
- **Low Stock**: Items appear when on-hand ≤ reorderPoint  
- **PO Receive**: Partial receive updates remaining qty  
- **Validation**: All create/update endpoints return errors for invalid input

---

### Non-Goals (MVP)
- Barcode scanning/printing  
- Multi-tenant support  
- Sales orders/invoicing  
- Serial or lot tracking  
- Complex analytics  
- Email sending in production (temp password returned in dev)

---

### Seed Data (for demo/testing)
**Users:**
- `admin@example.com` / `Passw0rd!` (Admin)
- `staff@example.com` / `Passw0rd!` (Staff)

**Locations:**
- `WH-01` (Main Warehouse)
- `WH-02` (Overflow)

**Items:**
- `SKU-001 Blue Pen` (unit: pcs, reorderPoint: 50)  
- `SKU-002 A4 Paper` (unit: ream, reorderPoint: 20)  
- `SKU-003 Coffee Beans 1kg` (unit: bag, reorderPoint: 10)  

**Suppliers:**
- `OfficeCo`
- `Bean Bros`
