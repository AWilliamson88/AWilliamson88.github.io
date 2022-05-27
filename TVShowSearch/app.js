const form = document.querySelector('#searchform');
const tvShowDisplay = document.querySelector('.tvshowdisplay');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchText = form.elements.title.value;
    const config = { params: { q: searchText } }
    removeShows();
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        showTVShows(res.data);
        console.log(res);
    } catch (e) {
        console.log("Error, ", e);
    }
    form.elements.title.value = "";
})

const showTVShows = (shows) => {
    for (let result of shows) {

        const tvShow = document.createElement('DIV');
        tvShow.classList.add('tvshow');
        const img = addImage(result.show);
        const details = addDetails(result.show);

        tvShow.appendChild(img);
        tvShow.appendChild(details);
        tvShowDisplay.appendChild(tvShow);
    }

}

const addImage = (show) => {
    const img = document.createElement('IMG');
    if (show.image) {
        if (show.image.medium) {
            img.src = show.image.medium;
        } else if (show.image.original) {
            img.src = show.image.original;
        }
    } else {
        img.classList.add("noimage");
        img.alt = "No image avialable.";
    }
    return img;
}

const addDetails = show => {
    const detailsDiv = document.createElement('DIV');
    detailsDiv.classList.add('showdetails');

    const title = document.createElement('H2');
    title.classList.add('showtitle');
    title.textContent = show.name;

    detailsDiv.appendChild(title);
    return detailsDiv;
}

const removeShows = () => {
    const tvShows = document.querySelectorAll('.tvshow');
    tvShows.forEach((show) => show.remove());
}