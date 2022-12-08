import createRepository from '~/repositories/repo'

export default (ctx: any, inject: any) => {
  inject('repositories', createRepository(ctx.$axios))
}
