var params = (new URL(document.location)).search;

console.log("params are ", params);

fetch(`/api/real-estate-search-results${params}`)
.then(response => response.json())
.then(response => buildDataPage(response.posting))
.catch(err=> console.error(err.stack));