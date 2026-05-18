DROP VIEW IF EXISTS customer_sales_summary;

CREATE VIEW customer_sales_summary AS
SELECT
  c.custno,
  c.custname,
  c.payterm,
  c.record_status,
  COUNT(DISTINCT s.transNo)       AS totalTransactions,
  SUM(sd.quantity * ph.unitPrice) AS totalSpend,
  MAX(s.salesDate)                AS lastSaleDate
FROM customer c
LEFT JOIN sales s          ON s.custNo = c.custno
LEFT JOIN salesdetail sd   ON sd.transNo = s.transNo
LEFT JOIN (
  SELECT prodCode, unitPrice
  FROM pricehist ph1
  WHERE effDate = (
    SELECT MAX(effDate)
    FROM pricehist
    WHERE prodCode = ph1.prodCode
  )
) ph ON ph.prodCode = sd.prodCode
GROUP BY c.custno, c.custname, c.payterm, c.record_status
ORDER BY totalSpend DESC NULLS LAST;

SELECT * FROM customer_sales_summary LIMIT 5;