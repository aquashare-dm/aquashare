select * from requests
inner join riders on requests.rider_id = riders.rider_id
where accepted IS NULL
and requests.tier_id = (select tier_id from boats where boats.driver_id = $1)
ORDER BY
    requests.request_date ASC,
    requests.request_start_time ASC,
    requests.request_end_time ASC;