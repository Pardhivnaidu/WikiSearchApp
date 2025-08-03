let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");

  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    let searchInput = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

// Fetch data from the API using the search URL.
// 1. fetch(url) → sends a request to the API.
// 2. response.json() → converts the JSON string received into a JavaScript object.
// 3. jsonData → the object returned from the API (contains a property "search_results").
// 4. { search_results } = jsonData → destructures the array of search results from the object.
// 5. displayResults(search_results) → passes the array of results to be displayed on the page.
fetch(url)
  .then(function (response) {
    return response.json(); // Parse response into a JavaScript object
  })
  .then(function (jsonData) {
    let { search_results } = jsonData; // Extract search_results array from the object
    displayResults(search_results); // Display the search results dynamically
  });
    
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
