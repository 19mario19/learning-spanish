// window.scrollTo({
//   top: document.body.scrollHeight,
// })
let playingAudio = []

window.addEventListener("DOMContentLoaded", () => {
  const spanToggle = document.querySelector(".toggle-translation")

  const spans = document.querySelectorAll("p span")

  const lessonNumber = document.body.dataset.lesson

  spanToggle.addEventListener("click", () => {
    spans.forEach((span) => {
      span.classList.toggle("active")
    })
  })

  const buttons = []

  const stopAudio = document.querySelector(".stop-audio")
  stopAudio.addEventListener("click", () => stopAllAudio())

  document.querySelectorAll("section").forEach((section, index) => {
    const title = section?.querySelector("h3")

    const btn = document.createElement("button")
    buttons.push(btn)
    btn.classList.add("speak-button")
    const icon = document.createElement("i")
    icon.classList.add("material-icons")
    icon.textContent = "volume_up"
    btn.appendChild(icon)
    title.appendChild(btn)

    const audioPath = `/audio/lesson-${lessonNumber}/${index + 1}.mp3`
    console.log(audioPath)
    const audio = new Audio(audioPath)
    playingAudio.push(audio)

    audio.onended = function () {
      removeAllActive(buttons)
    }

    icon.addEventListener("click", () => {
      removeAllActive(buttons)
      btn.classList.add("active")

      stopAllAudio()
      audio.currentTime = 0
      audio.play()
    })
  })

  // insert first in main
  const main = document.querySelector("main")
  const container = document.createElement("div")
  container.classList.add("container")
  main.insertBefore(container, main.firstChild)

  const intro = document.createElement("div")
  intro.classList.add("intro")
  container.append(intro)

  const introTitle = document.createElement("h3")
  introTitle.textContent = "Intro"
  intro.append(introTitle)

  // Buttons container for intro
  const introButtonsContainer = document.createElement("div")
  introButtonsContainer.classList.add("controls")

  // Play button
  const introPlayBtn = document.createElement("button")
  const introPlayIcon = document.createElement("i")
  introPlayIcon.classList.add("material-icons")
  introPlayIcon.textContent = "play_arrow"
  introPlayBtn.appendChild(introPlayIcon)

  // Pause button
  const introPauseBtn = document.createElement("button")
  const introPauseIcon = document.createElement("i")
  introPauseIcon.classList.add("material-icons")
  introPauseIcon.textContent = "pause"
  introPauseBtn.appendChild(introPauseIcon)

  // Restart button
  const introRestartBtn = document.createElement("button")
  const introRestartIcon = document.createElement("i")
  introRestartIcon.classList.add("material-icons")
  introRestartIcon.textContent = "replay"
  introRestartBtn.appendChild(introRestartIcon)

  const audioPath = `audio/intro.mp3`
  const audio = new Audio(audioPath)
  playingAudio.push(audio)

  // Play button functionality
  introPlayIcon.addEventListener("click", () => {
    stopAllAudio()
    audio.play()
  })

  // Pause button functionality
  introPauseIcon.addEventListener("click", () => {
    audio.pause()
  })

  // Restart button functionality
  introRestartIcon.addEventListener("click", () => {
    stopAllAudio()
    audio.currentTime = 0
    audio.play()
  })

  introButtonsContainer.append(introPlayBtn)
  introButtonsContainer.append(introPauseBtn)
  introButtonsContainer.append(introRestartBtn)
  intro.append(introButtonsContainer)

  const tutorial = document.createElement("div")
  tutorial.classList.add("tutorial")
  container.append(tutorial)

  const tutorialTitle = document.createElement("h3")
  tutorialTitle.textContent = "Tutorial"
  tutorial.append(tutorialTitle)

  // Buttons container for tutorial
  const tutorialButtonsContainer = document.createElement("div")
  tutorialButtonsContainer.classList.add("controls")

  // Play button
  const tutorialPlayBtn = document.createElement("button")
  const tutorialPlayIcon = document.createElement("i")
  tutorialPlayIcon.classList.add("material-icons")
  tutorialPlayIcon.textContent = "play_arrow"
  tutorialPlayBtn.appendChild(tutorialPlayIcon)

  // Pause button
  const tutorialPauseBtn = document.createElement("button")
  const tutorialPauseIcon = document.createElement("i")
  tutorialPauseIcon.classList.add("material-icons")
  tutorialPauseIcon.textContent = "pause"
  tutorialPauseBtn.appendChild(tutorialPauseIcon)

  // Restart button
  const tutorialRestartBtn = document.createElement("button")
  const tutorialRestartIcon = document.createElement("i")
  tutorialRestartIcon.classList.add("material-icons")
  tutorialRestartIcon.textContent = "replay"
  tutorialRestartBtn.appendChild(tutorialRestartIcon)

  const audioPath2 = `audio/lesson-${lessonNumber}/tutorial.mp3`
  const audio2 = new Audio(audioPath2)
  playingAudio.push(audio2)

  // Play button functionality
  tutorialPlayIcon.addEventListener("click", () => {
    stopAllAudio()
    audio2.play()
  })

  // Pause button functionality
  tutorialPauseIcon.addEventListener("click", () => {
    audio2.pause()
  })

  // Restart button functionality
  tutorialRestartIcon.addEventListener("click", () => {
    stopAllAudio()
    audio2.currentTime = 0
    audio2.play()
  })

  tutorialButtonsContainer.append(tutorialPlayBtn)
  tutorialButtonsContainer.append(tutorialPauseBtn)
  tutorialButtonsContainer.append(tutorialRestartBtn)
  tutorial.append(tutorialButtonsContainer)
})

function stopAllAudio() {
  playingAudio.forEach((audio) => audio.pause())
}

function removeAllActive(elements) {
  elements.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active")
  })
}
