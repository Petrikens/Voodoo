import axios from 'axios'

export function fetchPosts(config) {
  const url = import.meta.env.VITE_SERVER_PREFIX + 'posts'

  return axios(url, config)
}

export function fetchFilteredPosts(config) {
  const url = import.meta.env.VITE_SERVER_PREFIX + 'posts'

  return axios(url, config)
}
