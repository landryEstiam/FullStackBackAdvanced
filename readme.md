# Node & MongoDB

## Comment lancer le projet

docker-compose -f stack.yml up

## Lancer le contenaire mongo

docker exec -it docker_mongo_challenge bash

### Pour se connecter a la base de donnée

mongosh -u root -p example