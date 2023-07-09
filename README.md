# Express-K8s

this is a fully featured/functional application involving routing, authentication, database, migrations, testing, docker and k8s deployment.

For those who like to see the bigger picture, this is for you.

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white">
<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/starship-DD0B78?style=for-the-badge&logo=starship&logoColor=white">

## Features

-   Built with [ExpressJs](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/)
-   Validation with [Zod](https://github.com/colinhacks/zod)
-   Authetication with [JWT](https://jwt.io/) and [Passport](http://www.passportjs.org/)
-   Database integration and migrations with [Prisma](https://www.prisma.io/)
-   Testing with [Vitest](https://vitest.dev/)
-   Containerized app with [Docker](https://www.docker.com/)
-   Deployment using [minikube](https://minikube.sigs.k8s.io/docs/) and [k8s](https://kubernetes.io/)

## Usage

### Running the app

make sure you have [Nodejs](https://nodejs.org/en) and [Yarn](https://yarnpkg.com/) installed on your machine.

To install the Dependencies :

```console
$ yarn install
```

Now to bootstrap the application :

```console
$ yarn dev
```

And the application will be running on port `3000`

### Running inside Docker

First, build the image :

```console
$ docker build . -t express-k8s
```

Second, run the container :

```console
$ docker run -d -p 3000:3000 --name express-k8s-container express-k8s
```

Or to run with `docker-compose` :

```console
$ docker compose up app -d
```

### Running Tests

Make sure you first run app either normally or withing docker.

To run the tests, just run:

```console
$ yarn test:dev # watch mode
$ yarn test:ci # run and exit
```

### Using k8s

Make sure you have minikube and k8s installed.

First, [build the image with docker](#running-inside-docker).

Second, load the image in minikube:

```console
$ minikube image load express-k8s
```

Now we can create the configMap, Secret, Service and Deployment:

```console
$ kubectl apply -f ./k8s/app-configMap.yaml
$ kubectl apply -f ./k8s/app-secret.yaml
$ kubectl apply -f ./k8s/app-deployment.yaml # will create deploy and svc
```

To start receiving connections, we can use kubectl `port-forward` feature to expose our port locally:

```console
$ kubectl port-forward service/express-k8s 3000:3000
```
