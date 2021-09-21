export default function makeRefList() {
  let refs = []

  return { refs, push: pushRef }

  function pushRef(el) {
    refs.push(el)
  }
}
