.PHONY: setup dev start docker-build up down logs fmt lint

setup:
	npm install
	npm run setup

dev:
	BACKEND_PORT?=5050 FRONTEND_PORT?=3001 npm run dev

start: dev

docker-build:
	npm run docker:build

up:
	npm run docker:up

down:
	npm run docker:down

logs:
	npm run docker:logs
