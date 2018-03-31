# Docker Image for APEX Nitro

**Note: this is NOT READY **

<!-- TOC -->

- [Docker Image for APEX Nitro](#docker-image-for-apex-nitro)
  - [Setup](#setup)
    - [Get Image](#get-image)
    - [Run APEX Nitro](#run-apex-nitro)
      - [One APEX Nitro Container](#one-apex-nitro-container)
      - [One APEX Nitro Container per Project](#one-apex-nitro-container-per-project)
  - [APEX Nitro Commands](#apex-nitro-commands)
  - [Configuration](#configuration)
    - [Volumes](#volumes)
    - [Ports](#ports)
  - [Developers](#developers)

<!-- /TOC -->

## Setup

### Get Image
```bash
TODO Confirm / create an OOS docker hub account
# docker pull oraopensource/apex-nitro
docker pull martindsouza/apex-nitro
```

### Run APEX Nitro
They're two ways to run APE Nitro Docker. One container per-project, or One container for all your APEX Nitro needs. The later is recommended and will be covered first.

#### One APEX Nitro Container

In this, recommended, approach one container will be setup for all your projects to use. The only negative approach with this concept is that you'll need to expose more of your host file system to the container than the other approach. _This will make sense as you configure APEX Nitro_

To run the docker container execute:

```bash
TODO change downloads to Documents

docker run -it -d \
  --name oos-apex-nitro \
  -p 3000:3000 \
  -p 4000:4000 \
  -v ~/Documents/apex-nitro-config:/home/node/.apex-nitro \
  -v ~/Downloads:/home/node/www \
  oraopensource/apex-nitro:latest
```

Parameter | Description
---------|----------
`--name oos-apex-nitro` | Name of container
`-p 3000:3000` | Port 3000 (host) will be mapped to 3000 on the container
`-p 4000:4000` | Port 4000 (host) will be mapped to 4000 on the container
`-v ~/Documents/apex-nitro-config:/home/node/.apex-nitro` |  All APEX Nitro configurations will be stored in `~/Documents/apex-nitro-config`
`-v ~/Downloads:/home/node/www` | Exposing your entire `Documents` folder so that it can reference any subfolder
`oraopensource/apex-nitro:latest` | Docker image to use

You can now configure APEX Nitro by running:

`docker exec -it oos-apex-nitro apex-nitro config myapp`
_Note: An error message will currently appear on screen. This will be fixed in future versions_

To run the configuration go to http://localhost:3000 (_assuming that you mapped port `3000:3000`_)

The configuration is the same as non-dockerized APEX Nitro **except for path reference**. If for example your project folder was in `~/Documents/apex-demo/www/src` then you'd enter `/home/node/www/apex-demo/www/src` as the source directory. Same logic applies for all other path references

Like non-docker APEX Nitro hit `ctrl+c` in the terminal once you're done with the configuration.

To run APEX Nitro:
`docker exec -it oos-apex-nitro apex-nitro launch myapp`
_Assuming `myapp` was the name using the APEX Nitro Configruation_

#### One APEX Nitro Container per Project

TODO

## APEX Nitro Commands

The following assume that you've already `run` the docker container and named it `oos-apex-nitro`

```bash
# Configure 
docker exec -it oos-apex-nitro apex-nitro config myapp

# Launch
docker exec -it oos-apex-nitro apex-nitro launch myapp

# Stop container
docker stop oos-apex-nitro

# Start container
docker start oos-apex-nitro
```



## Configuration

### Volumes

Path | Description
---------|----------
`/home/node/.apex-nitro` | This is the configuration folder to store the APEX Nitro app
`/home/node/www` | Base location where to map www folders to

### Ports

Port | Description
---------|----------
`3000` | APEX Nitro configuration
`4000` | APEX Nitro


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
