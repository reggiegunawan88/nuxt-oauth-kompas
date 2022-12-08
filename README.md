# nuxt-oauth2-kompasid
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
