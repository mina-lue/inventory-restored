-- Seed data for Inventory app (Postgres)
-- Run with: psql -d inventory_db -f seed-data-postgres.sql

BEGIN;

-- Inventory balance
INSERT INTO inventory_balance (id, capital, worth) VALUES (1, 50000.00, 75000.00);

-- Customers
INSERT INTO customer (id, name, type) VALUES
  (1, 'Retail Customer', 'retail'),
  (2, 'Wholesale Customer', 'wholesale'),
  (3, 'Walk-in', 'retail');

-- Employees
INSERT INTO employee (id, name, salary, position, phone) VALUES
  (1, 'Alice Smith', 45000.00, 'Factory Manager', '+15550000001'),
  (2, 'Bob Jones', 32000.00, 'Line Operator', '+15550000002'),
  (3, 'Carol Lee', 30000.00, 'Packaging', '+15550000003');

-- Assets (note: column "value" is used in entity mapping)
INSERT INTO asset (id, name, "value", quantity) VALUES
  (1, 'Mixing Machine', 5000.00, 1),
  (2, 'Packaging Line', 12000.00, 2);

-- Materials
INSERT INTO material (id, name, sku, barcode, category, supplier, unit, cost_price, price, quantity, reorder_point, location, active) VALUES
  (1, 'Wheat Flour', 'MAT-FL-001', '1110001110001', 'Raw Material', 'Acme Grains', 'kg', 0.50, 0.75, 1000, 100, 'Warehouse A', true),
  (2, 'White Sugar', 'MAT-SU-001', '1110001110002', 'Raw Material', 'SweetCo', 'kg', 0.40, 0.60, 800, 80, 'Warehouse A', true),
  (3, 'Yeast', 'MAT-YE-001', '1110001110003', 'Raw Material', 'BakeSupply', 'kg', 4.00, 5.50, 50, 10, 'Warehouse B', true);

-- Products
INSERT INTO product (id, name, sku, barcode, category, supplier, unit, cost_price, selling_price, price, tax_rate, quantity, sold_quantity, reorder_point, location, batch_number, serial_number, expiry_date, active, last_sold_time) VALUES
  (1, 'Basic Bread Loaf', 'PRO-BR-001', '2220002220001', 'Bakery', 'BakeSupply', 'pcs', 0.80, 1.50, 1.50, 5.0, 500, 120, 50, 'Store Shelf', 'BATCH-202605', 'SN-BR-001', '2026-12-31', true, NOW()),
  (2, 'Sweet Bun', 'PRO-BU-001', '2220002220002', 'Bakery', 'BakeSupply', 'pcs', 0.60, 1.20, 1.20, 5.0, 300, 60, 30, 'Store Shelf', 'BATCH-202605', 'SN-BU-001', '2026-12-31', true, NOW()),
  (3, 'Premium Wholegrain Loaf', 'PRO-WG-001', '2220002220003', 'Bakery', 'Acme Grains', 'pcs', 1.00, 2.50, 2.50, 5.0, 150, 20, 20, 'Store Shelf', 'BATCH-202605', 'SN-WG-001', '2027-06-30', true, NOW());

-- Product BOM items (materials required to make products)
-- quantity_per_unit is in material unit (kg) required per product unit
INSERT INTO product_bom_item (id, product_id, material_id, quantity_per_unit, wastage_percent, note) VALUES
  (1, 1, 1, 0.50, 2.0, 'Flour for Basic Bread'),
  (2, 1, 2, 0.05, 1.0, 'Sugar for Basic Bread'),
  (3, 1, 3, 0.01, 0.5, 'Yeast for Basic Bread'),
  (4, 2, 1, 0.40, 2.0, 'Flour for Sweet Bun'),
  (5, 2, 2, 0.10, 1.5, 'Sugar for Sweet Bun'),
  (6, 3, 1, 0.70, 3.0, 'Flour for Wholegrain Loaf');

-- Purchases (incoming material purchases)
INSERT INTO purchase (id, material_id, total_price, purchase_date, quantity, taxed, fsn) VALUES
  (1, 1, 500.00, NOW() - INTERVAL '14 days', 1000, true, 'P-INV-2026-001'),
  (2, 2, 160.00, NOW() - INTERVAL '10 days', 400, true, 'P-INV-2026-002'),
  (3, 3, 200.00, NOW() - INTERVAL '7 days', 50, true, 'P-INV-2026-003');

-- Productions (manufacturing runs)
INSERT INTO production (id, product_id, quantity, batch_number, wastage_quantity, production_cost, responsible_employee, note, production_date) VALUES
  (1, 1, 400, 'BATCH-202605-01', 8, 200.00, 'Alice Smith', 'Morning bake', NOW() - INTERVAL '5 days'),
  (2, 2, 200, 'BATCH-202605-02', 3, 90.00, 'Bob Jones', 'Sweet bun run', NOW() - INTERVAL '3 days');

-- Consumptions (materials consumed for production). Quantities match BOMs * production qty (rounded)
INSERT INTO consumption (id, material_id, production_id, quantity, consumption_date) VALUES
  (1, 1, 1, 200, NOW() - INTERVAL '5 days'),
  (2, 2, 1, 20, NOW() - INTERVAL '5 days'),
  (3, 3, 1, 4, NOW() - INTERVAL '5 days'),
  (4, 1, 2, 80, NOW() - INTERVAL '3 days'),
  (5, 2, 2, 20, NOW() - INTERVAL '3 days');

-- Sales (outgoing product sales)
INSERT INTO sale (id, product_id, total_price, sale_date, quantity, taxed, fsn, consumer_id) VALUES
  (1, 1, 75.00, NOW() - INTERVAL '4 days', 50, true, 'S-2026-001', 1),
  (2, 2, 24.00, NOW() - INTERVAL '2 days', 20, true, 'S-2026-002', 2),
  (3, 1, 15.00, NOW() - INTERVAL '1 days', 10, true, 'S-2026-003', 3);

-- Stock movements for purchases, production and sales
INSERT INTO stock_movement (id, item_type, item_id, movement_type, quantity_before, quantity_after, quantity_changed, reference_transaction_id, created_by, created_at, note) VALUES
  (1, 'MATERIAL', 1, 'PURCHASE', 0, 1000, 1000, 1, 'system', NOW() - INTERVAL '14 days', 'Initial purchase Flour'),
  (2, 'MATERIAL', 2, 'PURCHASE', 0, 400, 400, 2, 'system', NOW() - INTERVAL '10 days', 'Initial purchase Sugar'),
  (3, 'MATERIAL', 3, 'PURCHASE', 0, 50, 50, 3, 'system', NOW() - INTERVAL '7 days', 'Initial purchase Yeast'),
  (4, 'PRODUCT', 1, 'PRODUCTION', 100, 500, 400, 1, 'Alice Smith', NOW() - INTERVAL '5 days', 'Produced Basic Bread'),
  (5, 'PRODUCT', 2, 'PRODUCTION', 100, 300, 200, 2, 'Bob Jones', NOW() - INTERVAL '3 days', 'Produced Sweet Bun'),
  (6, 'PRODUCT', 1, 'SALE', 500, 450, -50, 1, 'Alice Smith', NOW() - INTERVAL '4 days', 'Sold Basic Bread'),
  (7, 'PRODUCT', 2, 'SALE', 300, 280, -20, 2, 'Bob Jones', NOW() - INTERVAL '2 days', 'Sold Sweet Bun');

-- Update product and material quantities to reflect purchases/production/consumption/sales
UPDATE material SET quantity = 1000 WHERE id = 1;
UPDATE material SET quantity = 380 WHERE id = 2; -- 400 purchased, 20 consumed
UPDATE material SET quantity = 46 WHERE id = 3;  -- 50 purchased, 4 consumed

UPDATE product SET quantity = 450, sold_quantity = 130 WHERE id = 1; -- 500 produced, 50 sold, previously 0
UPDATE product SET quantity = 280, sold_quantity = 80 WHERE id = 2;  -- 200 produced, 20 sold, previously 100

-- Set sequences to a safe next value (adjust if you used different ids)
SELECT setval('inventory_balance_id_seq', 1, true);
SELECT setval('customer_id_seq', 3, true);
SELECT setval('employee_id_seq', 3, true);
SELECT setval('asset_id_seq', 2, true);
SELECT setval('material_id_seq', 3, true);
SELECT setval('product_id_seq', 3, true);
SELECT setval('product_bom_item_id_seq', 6, true);
SELECT setval('purchase_id_seq', 3, true);
SELECT setval('production_id_seq', 2, true);
SELECT setval('consumption_id_seq', 5, true);
SELECT setval('sale_id_seq', 3, true);
SELECT setval('stock_movement_id_seq', 7, true);

COMMIT;

-- End of seed file
