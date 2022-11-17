const form = document.querySelector('#searchform');
const tvShowDisplay = document.querySelector('.tvshowdisplay');
const tvShow = document.querySelector('.tvshow');

form.addEventListener('submit', async function (e) {

    e.preventDefault();

    await search();
})

const search = async () => {

    removeShows();
    const searchText = form.elements.title.value;
    const config = { params: { q: searchText } }

    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
        showTVShows(res.data);
    } catch (e) {
        console.log("Error, ", e);
    }

    form.elements.title.value = "";
}

const showTVShows = (shows) => {

    for (let result of shows) {

        const tvShow = document.createElement('DIV');
        tvShow.classList.add('tvshow');
        tvShow.addEventListener('click', () => { openIMDB(result.show) });


        const img = addImage(result.show);
        const details = addShowInfo(result.show);

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

const addShowInfo = show => {

    const detailsDiv = document.createElement('ARTICLE');
    detailsDiv.classList.add('showinfo');

    detailsDiv.appendChild(addShowHeader(show));
    detailsDiv.appendChild(addShowDetails(show));

    return detailsDiv;
}

const addShowHeader = (show) => {

    const header = document.createElement('HEADER');

    header.appendChild(getTitle(show));
    header.appendChild(
        getYearsAired(
            show.premiered,
            show.ended
        )
    );

    return header;
}

const getTitle = show => {

    const title = document.createElement('H2');
    title.classList.add('showtitle');
    title.textContent = show.name;

    return title;
}

const addShowDetails = (show) => {

    const details = document.createElement('FOOTER');
    details.classList.add('showdetails');

    const genres = document.createElement('SPAN');
    genres.textContent = `${show.genres}`;

    details.appendChild(genres);
    return details;
}

const getYearsAired = (premiered, ended) => {

    const yearsAired = document.createElement('DIV');
    let aired;
    if (premiered) {
        aired = `(${premiered.split('-')[0]}`;
    }

    if (ended != null) {
        aired += ` - ${ended.split('-')[0]}`;
    }

    yearsAired.textContent = aired + ")";
    return yearsAired;
}

const removeShows = () => {

    const tvShows = document.querySelectorAll('.tvshow');
    tvShows.forEach((show) => show.remove());
}

const openIMDB = (show) => {

    window.open(`https://imdb.com/title/${show.externals.imdb}/`, '_blank');
}
