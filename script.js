/**
 * @description Bootcamp - Week 3 - Day 4 - Mini Project #2 - Drumset
 * Create a drumset using HTML, CSS, JS.
 * 
 * @author Yao Kan KOUASSI
 * @date 2023-01-10
 */


// 1. Get the clicked element, or key press.
// 2. Use it’s value to get the correct audio element.
// 3. Play the audio element.

// Map keys to sound notes
let buttons = [
    ['A', 'Boom'],
    ['S', 'Clap'],
    ['D', 'HiHat'],
    ['F', 'Kick'],
    ['G', 'OpenHat'],
    ['H', 'Ride'],
    ['J', 'Snare'],
    ['K', 'Tink'],
    ['L', 'Tom']
]
let sounds = {}

buttons.forEach(b => {
    // Create and buttons to the page
    let button = document.createElement('button')
    document.querySelector('.container').appendChild(button)

    let key = document.createElement('kbd')
    key.textContent = b[0]
    button.appendChild(key)
    let description = document.createElement('span')
    description.textContent = b[1]
    button.appendChild(description)

    let sound = b[1].toLowerCase()
    button.dataset.sound = sound
    button.dataset.key = b[0]

    // Create the sound associated to the button
    let audio = new Audio('./sounds/' + sound + '.wav')
    audio.loop = false
    audio.controls = true
    audio.preload = "auto"
    audio.autoplay = false
    audio.volume = 1.0
    // Button's visual active effects
    audio.onplaying = (e) => button.classList.add('active')
    audio.onended = (e) => button.classList.remove('active')
    sounds[sound] = audio

    button.onclick = () => {
        playSound(b[0], button)
    }

})

// Also use keyboard keys to play sounds
window.addEventListener('keydown', (e) => {
    let char = e.key.toUpperCase()
    playSound(char)
})

/**
 * Play the sound note associated with the key pressed or the button clicked.
 * @param {string} key A element from the list A, S, D, F, G, H, J, K, L 
 * @param {HTMLButtonElement|null} btn The known button element clicked
 * @returns undefined
 */
function playSound(key, btn = null) {
    if (null === btn)
        btn = document.querySelector('button[data-key="' + key + '"]')
    if(!btn) return
    // for(let s in sounds) {
    //     sounds[s].pause()
    //     sounds[s].currentTime = 0
    // }
    sounds[btn.dataset.sound].load()
    sounds[btn.dataset.sound].play()
}