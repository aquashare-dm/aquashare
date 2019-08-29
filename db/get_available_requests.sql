select * from requests
inner join riders on requests.rider_id = riders.rider_id
where accepted IS NULL;