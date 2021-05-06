export const startTurbo = async () => {
  if (!window.Turbo) {
    const Turbo = require('@hotwired/turbo')
    await Turbo.start()
    window.Turbo = Turbo
  }
  return window.Turbo;
}