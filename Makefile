deploy:
	docker-compose up
migrate:
	docker exec -it api sh -c "./node_modules/.bin/knex migrate:latest"