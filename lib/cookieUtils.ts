export function getCookie(name: string) {
  const cookieArr = document.cookie.split(';')

  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].trim()
    if (cookiePair.startsWith(`${name}=`)) {
      return cookiePair.split('=')[1]
    }
  }

  return null
}

export function isCookieSet(name: string) {
  return document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith(`${name}=`))
}
