const btn = document.getElementById("btn");
const content = document.getElementById("content");

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

window.addEventListener("load", () => {
    setTimeout(() => {
        speak("Daragaya is awake... What can I do for you today?");
    }, 2000);
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition(); // Create an instance of SpeechRecognition

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript + " ";
            }
        }
        transcript = transcript.trim();
        if (transcript) {
            content.textContent = transcript;
            takeCommand(transcript.toLowerCase());
        }
    };

    btn.addEventListener("click", () => {
        content.textContent = "🎤 Listening...";
        recognition.start();
    });
} else {
    alert("Speech Recognition is not supported by your browser.");
}

