SELECT id,
    DATE_FORMAT(timeStamp, "%Y-%m-%d") as create_at
FROM piemall.order
WHERE status != 'to_pay'
GROUP BY create_at
ORDER BY create_at;

select id,DATE_FORMAT(timeStamp, "%Y-%m-%d") as create_at,
    COUNT(DATE_FORMAT(timeStamp, "%Y-%m-%d")) as countDays
from piemall.order
where TO_DAYS(NOW()) - TO_DAYS(timeStamp) <= 17
group by create_at
ORDER BY create_at;