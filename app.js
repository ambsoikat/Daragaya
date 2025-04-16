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

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

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
    console.log("Transcript:", transcript); // ✅ এখানে ট্রান্সক্রিপ্ট দেখবে

    if (transcript) {
        content.textContent = transcript;
        takeCommand(transcript.toLowerCase());
    }
};


btn.addEventListener("click", () => {
    console.log("Button clicked");
    content.textContent = "🎤 Listening...";
    recognition.start();
});

function takeCommand(message) {
    console.log("Command Received:", message); // Check if the command is received
    if (message.includes("hello")) {
        speak("Hello! How are you?");
    } else if (message.includes("how are you")) {
        speak("I am doing well, how can I assist you today?");
    } else if (message.includes("your name")) {
        speak("My name is Daragaya.");
    } else {
        speak("Sorry, I couldn't understand that.");
    }
}

