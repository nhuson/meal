deploy:
	docker-compose up
migrate:
	docker exec -it api sh -c "./node_modules/.bin/knex migrate:latest"
rollback:
	docker exec -it api sh -c "./node_modules/.bin/knex migrate:rollback"	
#--name=test --table=xxx --valid=true
gen-temp:
	node ./core/bin/gen