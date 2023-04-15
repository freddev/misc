____
```sql
WITH monthly_sales AS (
  SELECT DATE_TRUNC('month', created_at) AS month, SUM(price * quantity) AS total_sales
  FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  WHERE status = 'complete'
  GROUP BY DATE_TRUNC('month', created_at)
), top_selling_products AS (
  SELECT products.id, products.name, SUM(order_items.quantity) AS total_quantity
  FROM products
  JOIN order_items ON products.id = order_items.product_id
  WHERE order_items.order_id IN (
    SELECT id FROM orders WHERE DATE_TRUNC('month', created_at) = (SELECT month FROM monthly_sales ORDER BY total_sales DESC LIMIT 1)
  )
  GROUP BY products.id
  ORDER BY total_quantity DESC
  LIMIT 10
)
SELECT monthly_sales.month, monthly_sales.total_sales, top_selling_products.name, top_selling_products.total_quantity
FROM monthly_sales
CROSS JOIN top_selling_products
ORDER BY monthly_sales.month, top_selling_products.total_quantity DESC;

```
In this example, we have a query that retrieves monthly sales data and the top 10 best-selling products for each month, sorted by total sales and quantity.
The query first creates a Common Table Expression (CTE) called monthly_sales that groups orders by month and calculates the total sales for each month.
Next, it creates a second CTE called top_selling_products that finds the top 10 best-selling products for the month with the highest total sales. It does this by joining the products and order_items tables, filtering by orders that were placed in the month with the highest total sales, and grouping by product ID.
Finally, the query selects the month and total sales from the monthly_sales CTE and the product name and total quantity from the top_selling_products CTE, and sorts the results by month and total quantity.

_fredrik (at) conva se_
