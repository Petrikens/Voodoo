import axios from 'axios'

export function fetchUsers() {
  const url = import.meta.env.VITE_SERVER_PREFIX + 'users'

  return axios(url)
}
