# API / Front-End Docker Compose Skeleton

## Overview
This package is a skeleton for Web Applications with API Platform / Symfony / PHP back-end and a Node Front-End (VueJS, React, Angular).

## Installation
### Basic
```bash
make env
```
Then modify
- `shared/.env`
- `app/.env`

_The `app/.env` file is automatically created by Symfony Flex when you run the application for the first time. So run the application, adjust the file and then restart. If a `api/.env.dist` file exists, it will be copied to `/api/.env` when the above command is run._

Initialise the API - This will run and then stop and remove the container when you press another key. When the container starts, your composer packages are installed and this happens after your local volume is mounted. There will be an error in the logs because when started, the .env file has none of the required variables. Next time you run the php container it will be using the populated .env file.
```bash
make php
```

Now edit `api/.env`. Once complete you are ready to run your application

### Advanced
If you use other packages in your Symfony API that need to write to the volume, you should edit `api/_docker/php/Dockerfile` and `api/_docker/php/docker-entrypoint.sh` so that the directories are created during builds and permissions adjusted properly.

By default:
- the API has a `composer.json` which will install [API Platform](https://api-platform.com) which is built on [Symfony](https://symfony.com/)
- the app has a `package.json` which will install [Nuxt](https://nuxtjs.org/) which is built on [VueJS](https://vuejs.org/) - we are using the Nuxt Express flavour which means the Express server can handle JWT refresh tokens without passing them to the end-user. In fact the Nuxt configuration has a number of added modules and plugins we commonly use so it is likely you would want to update this to fit your needs.

Before installing, you can alter your dependencies if you wish. You can also remove the `shared` and `app` folders if you just want a server-side web application.

If you need to compile assets on the API you should run `composer require encore` - the php image used also includes yarn so you can adjust your `docker-entrypoint.sh` file to build assets for development or production by uncommenting the relevant lines.

This skeleton is designed to be run behind an nginx proxy with the repositories `silverbackis/nginx:proxy`, `jwilder/docker-gen` and `jrcs/letsencrypt-nginx-proxy-companion`. This means in your `docker-compose-prod.yaml` file you can configure Let's Encrypt certificates.

Link coming soon to another GitHub repo with this Docker Compose configuration.

Please be aware that this is a starting configuration and you can modify this to suit your needs. The PHP version being installed includes some extensions such as `gd`, `imagick`, `pdo_mysql`, `apcu` and more so is not the most minimal setup. This repository was created so we can setup servers that will work for 90% of the websites we make and can be adjusted quickly for a server-side only application if required.

## Running Applications
Use the Makefile commands to run your application in development or production
```bash
# Start Docker Compose (Dev)
make start

# Stop and Remove
make stop

# Start in production wither with the environment variable ENV set to 'prod' or
make start env=prod
```
