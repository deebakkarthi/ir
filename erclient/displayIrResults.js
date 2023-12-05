function updateTitle() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("q")
    document.title = searchTerm + " - IR Search"
}

function updateSearchBar() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("q")
    let searchBar = document.getElementById("searchBar");
    searchBar.setAttribute("value", searchTerm);
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
        console.log(responseJSON[res]);
        let div = buildSearchResultElement(responseJSON[res]);
        searchResultsArea.appendChild(div);
    }
}

updateTitle();
updateSearchBar();
getResults();
