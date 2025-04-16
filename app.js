const btn = document.getElementById("btn");
const content = document.getElementById("content");
const textInput = document.getElementById("textInput");

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
    alert("Sorry, your browser does not support Speech Recognition.");
}

textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const msg = textInput.value.trim();
        if (msg) {
            content.textContent = msg;
            takeCommand(msg.toLowerCase());
            textInput.value = "";
        }
    }
});

function takeCommand(message) {
    console.log("Command Received:", message);
    if (message.includes("hello")) {
        speak("Hello! How are you?");
    } else if (message.includes("how are you")) {
        speak("I'm doing great! How can I help you?");
    } else if (message.includes("what is your name")) {
        speak("My name is Daragaya.");
    } else if (message.includes("what time is it")) {
        const now = new Date();
        speak("The time is " + now.toLocaleTimeString());
    } else if (message.includes("what is today")) {
        const today = new Date();
        speak("Today is " + today.toDateString());
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://www.twitter.com", "_blank");
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com", "_blank");
    } else if (message.includes("search on google")) {
        let query = message.replace("search on google", "").trim();
        speak("Searching for " + query + " on Google.");
        window.open("https://www.google.com/search?q=" + query, "_blank");
    } else if (message.includes("play music")) {
        speak("Playing music");
        window.open("https://www.youtube.com/results?search_query=music", "_blank");
    } else if (message.includes("play song")) {
        let songQuery = message.replace("play song", "").trim();
        if (songQuery) {
            speak("Playing " + songQuery);
            window.open("https://www.youtube.com/results?search_query=" + songQuery, "_blank");
        } else {
            speak("Please specify a song name.");
        }
    } else if (message.includes("thank you")) {
        speak("You're welcome!");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant created to help you.");
    } else if (message.includes("open gmail")) {
        speak("Opening Gmail");
        window.open("https://mail.google.com", "_blank");
    } else if (message.includes("open maps")) {
        speak("Opening Google Maps");
        window.open("https://www.google.com/maps", "_blank");
    } else if (message.includes("tell me a joke")) {
        speak("Why don’t skeletons fight each other? They don’t have the guts!");
    } else if (message.includes("calculate")) {
        const expression = message.replace("calculate", "").trim();
        try {
            let result = eval(expression);
            speak("The result is " + result);
        } catch (error) {
            speak("Sorry, I couldn't calculate that.");
        }
    } else if (message.includes("play youtube")) {
        let videoQuery = message.replace("play youtube", "").trim();
        if (videoQuery) {
            speak("Playing " + videoQuery + " on YouTube");
            window.open("https://www.youtube.com/results?search_query=" + videoQuery, "_blank");
        } else {
            speak("Please specify a video name.");
        }
    } else if (message.includes("set reminder")) {
        const reminder = message.replace("set reminder for", "").trim();
        speak("Reminder set for " + reminder);
        // Reminder functionality can be extended with a timeout or reminder notification
    } else if (message.includes("weather in")) {
        const city = message.replace("weather in", "").trim();
        speak("Fetching weather details for " + city);
        // Integrate weather API here to fetch real-time weather info
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com", "_blank");
    } else if (message.includes("open snapchat")) {
        speak("Opening Snapchat");
        window.open("https://www.snapchat.com", "_blank");
    } else if (message.includes("remind me to")) {
        const task = message.replace("remind me to", "").trim();
        speak("Setting a reminder to " + task);
        // Set reminder feature with a time-based trigger or notification
    } else if (message.includes("translate")) {
        const translationQuery = message.replace("translate", "").trim();
        speak("Translating: " + translationQuery);
        // Add integration with Google Translate API here
    } else if (message.includes("open netflix")) {
        speak("Opening Netflix");
        window.open("https://www.netflix.com", "_blank");
    } else if (message.includes("open spotify")) {
        speak("Opening Spotify");
        window.open("https://www.spotify.com", "_blank");
    } else if (message.includes("open amazon")) {
        speak("Opening Amazon");
        window.open("https://www.amazon.com", "_blank");
    }
}
