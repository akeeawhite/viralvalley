/*
Title: search.js (Viral Finder)
Coded By: Akeea White
Date Modified: 1/28/19
*/
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('Insert_Your_API_Key');
}
 
// Called when the search button is clicked in the html code
function search() {
    // Validates if the length of the query is greater than 0 characters
    if(document.getElementById('query').value.trim().length > 0){
        var query = document.getElementById('query').value;
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: query,
            type: "video",
            maxResults: 5,
            order: "viewCount"
    });
      } else {
        alert('please enter a value into the search');
        return false;
      }
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);

    // Clears query results
    document.getElementById('query').value = '';
    document.getElementById('response').innerHTML = '';
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
    var results = response.result;
    $.each(results.items, function(index, item) {
        $.get("tpl/item.html", function(data) {
            $("#response").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
        });
    });
}
