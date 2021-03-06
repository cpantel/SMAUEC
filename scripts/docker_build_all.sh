find docker/containers/ -iname Dockerfile | while read FILE; do
  targetDir=$(  echo "$FILE" | xargs dirname )
  targetContainer=$( echo "$targetDir" | xargs basename )
  echo -n  cd "$targetDir  ; "

  echo -n docker build -t "smauec/$targetContainer:0.0.1" . ";"

  echo cd -

done


# docker build -t smauec/pgadmin:0.0.1 .
# docker build -t smauec/postgres:0.0.1 .
# docker build -t smauec/broker:0.0.1 .
# docker build -t smauec/mongo:0.0.1 .
# docker build -t smauec/proxy:0.0.1 .
# docker build -t smauec/node:0.0.1 .
# docker build -t smauec/odata:0.0.1 .
# docker build -t smauec/api-users:0.0.1 .
# docker build -t smauec/api-rules:0.0.1 .
# docker build -t smauec/api-users:0.0.1 .
