CURRENT_DIRECTORY:=$(shell pwd)
env?=dev

env:
	./bin/copy-env.sh $(env)

api:
	# this would definitely be better to read the stdout of the docker compose script and kill when we see that composer is done running but I am not sure how to do this
	@docker-compose -f ./docker-compose.yaml -f ./docker-compose-$(env).yaml up -d php
	read -t 120 -r -p "Wait until you can see all your files in your project's ./api firectory (composer install command running) - waiting 120 secs or press any key" input
	make stop

build:
	@docker-compose -f ./docker-compose.yaml -f ./docker-compose-$(env).yaml build --no-cache --pull

start:
	@docker-compose -f ./docker-compose.yaml -f ./docker-compose-$(env).yaml up -d --force-recreate

stop:
	@docker-compose down

.PHONY: env php build start stop
