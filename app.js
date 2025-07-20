window.scrollTo({
  top: document.body.scrollHeight,
})
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

  const introBtn = document.createElement("button")
  const icon = document.createElement("i")
  icon.classList.add("material-icons")
  icon.textContent = "volume_up"

  const audioPath = `audio/intro.mp3`
  const audio = new Audio(audioPath)

  playingAudio.push(audio)

  // Only icon triggers playback
  icon.addEventListener("click", () => {
    stopAllAudio()
    audio.currentTime = 0 // restart if already playing
    audio.play()
  })

  introBtn.appendChild(icon)
  intro.append(introBtn)

  const tutorial = document.createElement("div")
  tutorial.classList.add("tutorial")
  container.append(tutorial)

  const tutorialTitle = document.createElement("h3")
  tutorialTitle.textContent = "Tutorial"
  tutorial.append(tutorialTitle)

  const tutorialBtn = document.createElement("button")
  const icon2 = document.createElement("i")
  icon2.classList.add("material-icons")
  icon2.textContent = "volume_up"

  const audioPath2 = `audio/lesson-${lessonNumber}/tutorial.mp3`
  const audio2 = new Audio(audioPath2)
  playingAudio.push(audio2)

  icon2.addEventListener("click", () => {
    stopAllAudio()
    audio2.currentTime = 0 // restart if already playing
    audio2.play()
  })
  tutorialBtn.appendChild(icon2)

  tutorial.append(tutorialBtn)
})

function stopAllAudio() {
  playingAudio.forEach((audio) => audio.pause())
}

function removeAllActive(elements) {
  elements.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active")
  })
}
