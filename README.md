
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

#Switch to master branch

## Installation

```bash
$ npm install

#Install Mongo also and clone the repository after that 

$ docker pull mongo
$ docker run -d -p 27017:27017 --name -v mongo-data:/data/db test-mongo mongo:latest  
$ docker run -v MongoDockerData:/data/db --name mongodbt -d mongo

# Copy sample.env file to .env file in the main folder
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
