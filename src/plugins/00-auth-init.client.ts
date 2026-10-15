import { getMe } from '~/features/Auth'

export default defineNuxtPlugin(async () => {
  const me = await getMe()

  localStorage.setItem('id', me.id.toString())
  localStorage.setItem('displayName', me.displayName)
})