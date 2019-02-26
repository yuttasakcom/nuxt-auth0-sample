export default function(context) {
  context.store.dispatch('users/initAuth', context.req)
}
