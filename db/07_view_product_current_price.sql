DROP VIEW IF EXISTS product_current_price;

CREATE VIEW product_current_price
WITH (security_invoker = true)
AS
SELECT
  p.prodCode,
  p.description,
  p.unit,
  ph.unitPrice,
  ph.effDate AS priceEffDate
FROM product p
JOIN pricehist ph ON ph.prodCode = p.prodCode
WHERE ph.effDate = (
  SELECT MAX(effDate)
  FROM pricehist
  WHERE prodCode = p.prodCode
)
ORDER BY p.prodCode;

SELECT * FROM product_current_price LIMIT 5;