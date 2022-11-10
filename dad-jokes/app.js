const btn = document.querySelector('.btn');
const joke = document.querySelector('.joke');

const url = "https://icanhazdadjoke.com/";

btn.addEventListener('click', () => {
    getDadJoke();
});

const getDadJoke = async () => {
    try {
        const res = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'User-Agent': 'demo-app',
            }
        }
        );
        const data = await res.json();

        joke.textContent = data.joke;

    } catch (e) {
        console.log("Error" + e);
    }
}

getDadJoke();
