# Vue + Feathers.js Boilerplate

A template for starting projects using [Vue](https://vuejs.org/guide/introduction.html) ([Quasar](https://v2.quasar.dev)) and [Feathers.js](https://feathersjs.com/guides/).

## Backend

This project uses [Feathers.js](https://feathersjs.com/guides/) as a Backend and [MongoDB](https://www.mongodb.com/docs/) as the database.

Located in `./backend`. View [`README.md`](./backend/README.md) for more info.

## Frontend

This project uses [Vue](https://vuejs.org/guide/introduction.html) with [Quasar](https://v2.quasar.dev) and [Feathers Pinia](https://feathers-pinia.pages.dev/guide/) as the Frontend

Located in `./frontend`. View [`README.md`](./frontend/README.md) for more info.

## Code Style

The frontend and backend have their own formatting tools and configs, but you can check the whole project using [`pre-commit`](https://pre-commit.com/).
You can either run it manually with `pre-commit run --all-files` or have it run automatically on commit on staged files with `pre-commit install`.
