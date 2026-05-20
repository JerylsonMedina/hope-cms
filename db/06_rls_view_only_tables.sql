ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE salesdetail ENABLE ROW LEVEL SECURITY;
ALTER TABLE product ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricehist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS sales_select_only ON sales;
DROP POLICY IF EXISTS salesdetail_select_only ON salesdetail;
DROP POLICY IF EXISTS product_select_only ON product;
DROP POLICY IF EXISTS pricehist_select_only ON pricehist;

CREATE POLICY sales_select_only ON sales
FOR SELECT TO authenticated USING (true);

CREATE POLICY salesdetail_select_only ON salesdetail
FOR SELECT TO authenticated USING (true);

CREATE POLICY product_select_only ON product
FOR SELECT TO authenticated USING (true);

CREATE POLICY pricehist_select_only ON pricehist
FOR SELECT TO authenticated USING (true);

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('sales','salesdetail','product','pricehist');