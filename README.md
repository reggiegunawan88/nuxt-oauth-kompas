# OAuth 2.0 by Kompas.id 
<image alt="kompas-logo" src="https://d3w4qaq4xm1ncv.cloudfront.net/assets/kompas-logo-57.svg" />

## Description
This project was initiate and built for Kompas Gramedia's subsidiary: Kompas Daily Newspaper as one of the biggest media company in Indonesia, as an authentication gate using OAuth 2.0. I was involved for almost 80% code of the project when I was working as a front end software engineer at Kompas Gramedia.
The OAuth 2.0 system is using access token (JWT format) that represents the authorization to access resources on behalf of the end-user.
Tech stacks:
- NuxtJS (VueJS framework)
- TailwindCSS
- Typescript

## Website Homepage
https://account.kompas.id/login

## Dir
Learn more about nuxt dir structure [Directory Structure Docs](/docs/2.x/directory-structure/nuxt).
### Initialize
Before start using git flow, we need to initialize main branches with this command:
```sh
$ git flow init
```
And set the configuration as follow:

```sh
Branch name for production releases: [] master
Branch name for "next release" development: [] development
Feature branches? [] feature/
Release branches? [] release/
Hotfix branches? [] hotfix/
Support branches? [] support/
Version tag prefix? [] v
```
### Feature
To start working on a feature, you can start using command below:

```sh
$ git flow feature start <feature-name>
```

Then publish your working feature using:
```sh
$ git flow feature publish <feature-name>

# or a regular git push
$ git push origin HEAD
```

After finish working on the feature, create a pull-request to `development`.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Website Screenshoot 
<p align="center">
<img width="1433" alt="image" src="https://user-images.githubusercontent.com/44907916/209456180-9841a685-73af-45bc-bb83-cfc638e2a794.png">
</p>
