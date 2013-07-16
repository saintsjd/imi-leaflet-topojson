
var map = L.map('map').setView([37.8, -96], 4);

console.log(map);

L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
    key: '3bd9866164b34cfbaa1ce96cf799d7c6',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    styleId: 22677
}).addTo(map);