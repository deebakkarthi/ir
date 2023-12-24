function updatePage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("q")
    document.title = searchTerm + " - ER Search"
    let searchBar = document.getElementById("searchBar");
    searchBar.setAttribute("value", searchTerm);
    document.getElementById("relatedSearchTitle").innerHTML = searchTerm;
}

function buildSearchResultElement(res) {
    let div = document.createElement("div");
    div.classList.add("search-result");
    let p = document.createElement("p");
    p.classList.add("result-text");
    p.innerHTML = res;
    div.appendChild(p);
    return div;
}

function sortByValue(obj) {
    let sortable = [];
    for (var o in obj) {
        sortable.push([o, obj[o]]);
    }
    sortable.sort(function(a, b) {
        return -(a[1] - b[1]);
    });
    return sortable;
}

async function getThumbnailURL(ent) {
    const targetURL = "https://en.wikipedia.org/w/api.php?" + new URLSearchParams({
        "action": "query",
        "titles": ent,
        "prop": "pageimages",
        "format": "json",
        "pithumbsize": 150,
        "origin": "*",
    });
    let response = await fetch(targetURL);
    response = await response.json();
    response = response["query"]["pages"];
    let imageURL = []
    for (page in response) {
        if ("thumbnail" in response[page]) {
            imageURL.push(response[page]["thumbnail"]["source"]);
        }
    }
    if (imageURL.length == 0) {
        return null;
    }
    return imageURL[0];
}


async function buildEntityElement(ent, rel) {
    let div = document.createElement("div");
    div.classList.add("items-links");

    let itemEl = document.createElement("div");
    itemEl.classList.add("item");

    let a = document.createElement("a");
    a.title = ent;
    a.href = "https://en.wikipedia.org/wiki/" + ent;

    const imageURL = await getThumbnailURL(ent);
    let imgEl = document.createElement("img");
    if (imageURL != null) {
        imgEl.src = imageURL;
    } else {
        imgEl.src = "./no_image.png";
    }
    imgEl.alt = ent;
    imgEl.classList.add("item-logo");

    a.appendChild(imgEl)

    let p = document.createElement("p");
    p.classList.add("item-name");
    p.innerHTML = ent;

    a.appendChild(p);

    itemEl.appendChild(a);

    return itemEl;
}


async function getEntities() {
    const baseURL = window.location.protocol + "//" + window.location.hostname;
    const port = "5000"
    const path = "/erRetrieve"
    const targetURL = baseURL + ":" + port + path + "?";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("q")

    let response = await fetch(targetURL + new URLSearchParams({ "q": searchTerm }))
    let responseJSON = await response.json();

    //let responseJSON = {
    //    "Ancient_Egypt": 0.7213649749755859,
    //    "Antigonus_I_Monophthalmus": 0.6569240689277649,
    //    "Babylon": 1,
    //    "Cyrus_the_Great": 0.729214608669281,
    //    "Eumenes": 0.5769044756889343,
    //}
    responseJSON = sortByValue(responseJSON);
    responseJSON = responseJSON.slice(0, 5);

    let itemsLinks = document.getElementById("itemsLinks");
    for (res in responseJSON) {
        let el = await buildEntityElement(responseJSON[res][0], responseJSON[res][1]);
        itemsLinks.appendChild(el);
    }
}

async function getResults() {
    const baseURL = window.location.protocol + "//" + window.location.hostname;
    const port = "5000"
    const path = "/irRetrieve"
    const targetURL = baseURL + ":" + port + path + "?";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("q")

    let response = await fetch(targetURL + new URLSearchParams({ "q": searchTerm }))
    let responseJSON = await response.json();
    const searchResultsArea = document.getElementById("searchResultsBlock");
    for (res in responseJSON) {
        let div = buildSearchResultElement(responseJSON[res]);
        searchResultsArea.appendChild(div);
    }
}

updatePage();
getResults();
getEntities();
