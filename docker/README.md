# Docker Image for APEX Nitro

## Setup

Just run:

```bash
TODO Confirm
# docker pull oraopensource/apex-nitro
docker pull martindsouza/apex-nitro
```

## Developers

docker build -t oraopensource/apex-nitro .




docker run -it -d \
  --name apex-nitro \
  -p 3000:3000 \
  -p 4000:4000 \
  -v $(pwd)/apex-nitro-config:/home/node/.apex-nitro \
  -v $(pwd)/www:/home/node/www \
  oraopensource/apex-nitro:latest


docker exec -it apex-nitro apex-nitro launch test
docker exec -it apex-nitro apex-nitro config

docker run -t -i \
  --name ords:3.0.12 \
  -e DB_HOSTNAME=oracle \
  -e DB_PORT=1521 \
  -e DB_SERVICENAME=ORCLPDB1 \
  -e APEX_PUBLIC_USER_PASS=oracle \
  -e APEX_LISTENER_PASS=oracle \
  -e APEX_REST_PASS=oracle \
  -e ORDS_PASS=oracle \
  -e SYS_PASS=Oradoc_db1 \
  --volume /Users/giffy/docker/apex/5.1.3/images:/usr/local/tomcat/webapps/i \
  -p 8080:8080 \
  ords