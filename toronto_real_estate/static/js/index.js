fetch(`/api/real-estate-search-results`)
.then(response => response.json())
.then(response => buildIndexPage(response.posting))
.catch(err=> console.error(err.stack));

document.getElementById("submit").onclick = () => {
    var minPrice = document.getElementById("minprice").value;
    var maxPrice = document.getElementById("maxprice").value;
    var wScore = document.getElementById("wscore").value;

    window.location.href = `/data?minprice=${minPrice}&maxprice=${maxPrice}&wscore=${wScore}`;
};