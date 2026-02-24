const speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.getElementById('voice-select');
const btn = document.getElementById('listen-btn');
const btnText = document.getElementById('btn-text');
const btnIcon = btn.querySelector('.btn-icon');
const visualizer = document.getElementById('visualizer');
const status = document.getElementById('status');
const textInput = document.getElementById('text-input');
const count = document.getElementById('count');

// Char counter
textInput.addEventListener('input', () => {
    count.textContent = textInput.value.length;
});

// Load voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(`${voice.name} (${voice.lang})`, i);
    });
};

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});

// Speaking states
function setSpeaking(active) {
    if (active) {
        btn.classList.add('speaking');
        btnIcon.textContent = '■';
        btnText.textContent = 'Stop';
        visualizer.classList.add('active');
        status.textContent = 'Speaking…';
        status.classList.add('active');
    } else {
        btn.classList.remove('speaking');
        btnIcon.textContent = '▶';
        btnText.textContent = 'Listen';
        visualizer.classList.remove('active');
        status.textContent = '';
        status.classList.remove('active');
    }
}

speech.onstart = () => setSpeaking(true);
speech.onend = () => setSpeaking(false);
speech.onerror = () => setSpeaking(false);

btn.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
    }
    const text = textInput.value.trim();
    if (!text) {
        status.textContent = 'Please enter some text first.';
        return;
    }
    speech.text = text;
    window.speechSynthesis.speak(speech);
});
