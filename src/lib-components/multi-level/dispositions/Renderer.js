const defaultConfig = { elapsedMultiplicator: 0.0001 }

export default function useRenderer(onTick, config = defaultConfig) {
  config = Object.assign(config, defaultConfig)

  const fps = 60
  const frameDuration = 1000 / fps
  let lag = 0
  let frameId
  let start

  function tick() {
    frameId = requestAnimationFrame(tick)

    const current = Date.now()
    const elapsed = current - start
    start = current
    lag += elapsed

    while (lag >= frameDuration) {
      onTick(elapsed * config.elapsedMultiplicator)

      lag -= frameDuration
    }
  }

  return {
    start() {
      start = Date.now()
      frameId = requestAnimationFrame(tick)
    },
    stop() {
      cancelAnimationFrame(frameId)
    },
  }
}
