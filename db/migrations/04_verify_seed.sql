SELECT 'customer'   AS table_name, COUNT(*) AS row_count FROM customer
UNION ALL
SELECT 'product',                  COUNT(*) FROM product
UNION ALL
SELECT 'sales',                    COUNT(*) FROM sales
UNION ALL
SELECT 'salesdetail',              COUNT(*) FROM "salesdetail"
UNION ALL
SELECT 'pricehist',                COUNT(*) FROM "pricehist"
UNION ALL
SELECT 'Module',                   COUNT(*) FROM "Module"
UNION ALL
SELECT 'rights',                   COUNT(*) FROM rights
UNION ALL
SELECT 'user',                     COUNT(*) FROM public.user;

SELECT COUNT(*) AS orphan_sales
FROM sales s
LEFT JOIN customer c ON c.custno = s.custNo
WHERE c.custno IS NULL;

SELECT COUNT(*) AS orphan_details
FROM "salesdetail" sd
LEFT JOIN sales s ON s.transNo = sd.transNo
WHERE s.transNo IS NULL;

SELECT COUNT(*) AS orphan_prices
FROM "pricehist" ph
LEFT JOIN product p ON p.prodCode = ph.prodCode
WHERE p.prodCode IS NULL;

SELECT userid, user_type, record_status FROM public.user;