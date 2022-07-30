const button = document.querySelector('.btn');
const audioElement = document.getElementById('audio');
const apiKey = 'ce82abc07f2e47199e1f2412173da5ad';

function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const jokeData = await response.json();

        if (jokeData.setup) {
            joke = `${jokeData.setup} ... ${jokeData.delivery}`;
        } else {
            joke = jokeData.joke;
        }

        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.error('whoops, there is the error: ', error)
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
