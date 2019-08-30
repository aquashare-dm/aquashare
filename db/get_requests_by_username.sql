select * from requests 
where rider_id = $1
and accepted IS NULL
ORDER BY
    requests.request_date ASC,
    requests.request_start_time ASC,
    requests.request_end_time ASC;