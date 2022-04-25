SELECT guestId,
    SUM(quantity * G_price) as consumption
FROM piemall.order
    LEFT JOIN piemall.cart_goods_map ON piemall.order.id = piemall.cart_goods_map.orderId
    LEFT JOIN piemall.goods ON goods.G_id = piemall.cart_goods_map.goodGId
WHERE status != 'to_pay'
GROUP BY guestId
ORDER BY consumption;