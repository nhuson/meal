deploy:
	docker-compose up
init-db:
	docker exec -it api /bin/sh node_modules/.bin/knex migrate:latest --file knexfile.js