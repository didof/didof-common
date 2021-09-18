// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

function makeScrollManager() {
  const { style } = document.body
  let scrollY = 0

  return {
    enable() {
      style.position = ''
      style.top = ''
      window.scrollBy(0, scrollY)
    },
    disable() {
      scrollY = window.scrollY
      style.position = 'fixed'
      style.top = `-${scrollY}px`
    },
  }
}

export default makeScrollManager()
