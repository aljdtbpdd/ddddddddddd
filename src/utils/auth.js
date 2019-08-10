
export const getUser = () => JSON.parse(window.localStorage.getItem('user'))

export const setUser = (data) => window.localStorage.setItem('user', JSON.stringify(data))

export const removeItem = () => window.localStorage.removeItem('user')
