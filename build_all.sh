find docker/containers/ -iname Dockerfile | while read FILE; do
  targetDir=$(  echo "$FILE" | xargs dirname )
  targetContainer=$( echo "$targetDir" | xargs basename )
  cd "$targetDir"

  echo docker build -t "smauec/$targetContainer:0.0.1" . 

  cd -

done


# docker build -t smauec/pgadmin:0.0.1 .
# docker build -t smauec/postgres:0.0.1 .
# docker build -t smauec/broker:0.0.1 .
# docker build -t smauec/mongo:0.0.1 .
# docker build -t smauec/proxy:0.0.1 .