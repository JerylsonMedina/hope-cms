ALTER TABLE customer ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS cust_visibility ON customer;
DROP POLICY IF EXISTS customer_insert ON customer;
DROP POLICY IF EXISTS customer_update_edit ON customer;
DROP POLICY IF EXISTS customer_softdelete ON customer;
DROP POLICY IF EXISTS customer_recovery ON customer;

CREATE POLICY cust_visibility ON customer
FOR SELECT TO authenticated
USING (
  record_status = 'ACTIVE'
  OR get_my_user_type() IN ('ADMIN','SUPERADMIN')
);

CREATE POLICY customer_insert ON customer
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE userId = auth.jwt()->>'email'
    AND rightId = 'CUST_ADD'
    AND right_value = 1
  )
);

CREATE POLICY customer_update_edit ON customer
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE userId = auth.jwt()->>'email'
    AND rightId = 'CUST_EDIT'
    AND right_value = 1
  )
);

CREATE POLICY customer_softdelete ON customer
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "UserModule_Rights"
    WHERE userId = auth.jwt()->>'email'
    AND rightId = 'CUST_DEL'
    AND right_value = 1
  )
);

CREATE POLICY customer_recovery ON customer
FOR UPDATE TO authenticated
USING (
  get_my_user_type() IN ('ADMIN','SUPERADMIN')
);