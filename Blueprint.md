# Minimum Viable Product

---

## MVP Scope

### Roles
- **Admin**  
  - Full access to all features  
  - Can manage Users (CRUD) and master data  
  - Can perform all stock transactions (including negative adjustments)
  **Manager**
  - Can manage Items, Suppliers, Locations
- **Staff**  
  - Can perform stock transactions, create POs, view reports  
  - Read-only access to master data (Items, Suppliers, Locations)

---

### Core Entities
- **User**: `{ username, password, givenName, familyName, contact, address, passwordHash, role: 'admin'| 'manager' | 'staff', isActive }`
- **Item**: `{ sku, name, unit, category, reorderPoint, isActive }`
- **Location**: `{ code, name, notes? }`
- **Supplier**: `{ email, name, phone?, address? }`
- **Order**: `{ orderId, supplierId: email, itemId : sku, status, qty, unitCost }`
- **Transaction**: `{ type, itemId: sku, qty, fromLocationId?, toLocationId: code, unitCost?, note, userId: createdBy, createdAt }`

---

### Must-Have Flows
1. **Authentication**: Login with JWT, role-based permissions
2. **Authorization**: Login should only allow active users
2. **Users CRUD**: Managers can only view their department's data
3. **Items CRUD**
4. **Locations CRUD**
5. **Suppliers CRUD**
6. **Orders CRUD**: User should be able to choose item and supplier. 
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