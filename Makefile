CURRENT_DIRECTORY:=$(shell pwd)
env?=dev

env:
	-cp ./shared/.env.dist ./shared/.env
	-cp ./app/.env.dist ./app/.env
	-cp ./api/.env.dist ./api/.env

start:
	@docker-compose -f ./docker-compose.yaml -f ./docker-compose-$(env).yaml up -d --force-recreate

stop:
	@docker-compose down

pull:
	@docker-compose pull --ignore-pull-failures

.PHONY: install start stop pull
