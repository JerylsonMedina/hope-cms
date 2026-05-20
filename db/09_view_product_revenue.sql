DROP VIEW IF EXISTS product_revenue;

CREATE VIEW product_revenue
WITH (security_invoker = true)
AS
SELECT
  p.prodCode,
  p.description,
  p.unit,
  SUM(sd.quantity)                AS totalQtySold,
  SUM(sd.quantity * ph.unitPrice) AS totalRevenue
FROM product p
JOIN salesDetail sd ON sd.prodCode = p.prodCode
JOIN (
  SELECT prodCode, unitPrice
  FROM priceHist ph1
  WHERE effDate = (
    SELECT MAX(effDate)
    FROM priceHist
    WHERE prodCode = ph1.prodCode
  )
) ph ON ph.prodCode = p.prodCode
GROUP BY p.prodCode, p.description, p.unit
ORDER BY totalRevenue DESC;

SELECT * FROM product_revenue LIMIT 5;