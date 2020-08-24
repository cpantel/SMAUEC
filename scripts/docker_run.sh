PGA_USER=admin
PGA_PASS=12345602
PG_PASS=12345602

docker run -p 80:80 \
    --name relational_db_admin \
    -v /private/var/lib/pgadmin:/var/lib/pgadmin \
    -e "PGADMIN_DEFAULT_EMAIL=$PGA_USER" \
    -e "PGADMIN_DEFAULT_PASSWORD=$PGA_PASS" \
    -d dpage/pgadmin4:4.23

docker  --name relational_db -e POSTGRES_PASSWORD="$PG_PASS" -d postgres:12.3

# docker run --name broker --publish 192.168.1.106:1883:1883 eclipse-mosquitto


docker container create --tty --interactive --name relational_db dpage/pgadmin4:4.23 
