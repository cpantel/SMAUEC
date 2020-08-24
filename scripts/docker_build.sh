# 1 build volumes
docker volume create pgadmin

# 2 build images
cd docker/containers

cd pgadmin
docker build -t smauec/pgadmin:0.0.1 .
cd ..

cd postgres
docker build -t smauec/postgres:0.0.1 .
cd ..

cd broker
docker build -t smauec/broker:0.0.1 .
cd ..

# 3 build networks , n

docker network create --driver bridge --internal backbone
