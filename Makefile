deploy:
	docker-compose up
init-db:
	knex migrate:latest