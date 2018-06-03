"use strict";var map=void 0,infoWindow=void 0,markers=[],backupLocations=[{name:"The Trident",position:{lat:37.853405,lng:-122.478708},image:"https://s3-media3.fl.yelpcdn.com/bphoto/SavnswRo8GIvK1nKc-boyA/o.jpg",rating:3.5,address:"558 Bridgeway",highlighted:ko.observable(!1)},{name:"Napa Valley Burger Company",position:{lat:37.854616,lng:-122.479051},image:"https://s3-media2.fl.yelpcdn.com/bphoto/c4qNa-lDiZkMWRCirX1lgA/o.jpg",rating:4,address:"670 Bridgeway",highlighted:ko.observable(!1)},{name:"Barrel House Tavern",position:{lat:37.855221,lng:-122.478831},image:"https://s3-media3.fl.yelpcdn.com/bphoto/ndYSXvbqcxIthPof8nNbow/o.jpg",rating:3.5,address:"660 Bridgeway",highlighted:ko.observable(!1)},{name:"Lighthouse Cafe",position:{lat:37.856413,lng:-122.480081},image:"https://s3-media4.fl.yelpcdn.com/bphoto/rx9px8mrxgCFKU0img12MA/o.jpg",rating:4,address:"1311 Bridgeway",highlighted:ko.observable(!1)},{name:"Seafood Peddler",position:{lat:37.856567,lng:-122.478235},image:"https://s3-media1.fl.yelpcdn.com/bphoto/p6xdlY3vpG-G7WeGAFYOyA/o.jpg",rating:3.5,address:"303 Johnson St",highlighted:ko.observable(!1)}];function AppViewModel(){var t=this;t.spinner=ko.observable(!1),t.locations=ko.observableArray(),t.filteredLocations=ko.observableArray(),t.filterString=ko.observable(""),t.dataLoadError=ko.observable(!1),t.signalHighlited=function(o){for(var e=o.name,n=0;n<t.locations().length;n++){var a=t.locations()[n];if(a.name==e){a.highlighted(!0);var i=markers.filter(function(o){return o.name==e})[0];i&&(t.animateBouncing(i),t.displayInfoWindow(i))}else a.highlighted(!1)}},t.animateBouncing=function(e){markers.forEach(function(o){o==e?o.setAnimation(google.maps.Animation.BOUNCE):o.setAnimation(null)})},t.displayInfoWindow=function(o){infoWindow.setContent('\n            <div class="infoWindow">\n                <h3 class="name">'+o.name+'</h3>\n                <h4 class="rating">Yelp Rating: '+o.rating+"</h4>\n                <p>"+o.address+'</p>\n                <img src="'+o.image+'">\n            </div>\n            '),infoWindow.open(map,o)},t.search=function(){var e=t.filterString();if(0<e.length){var o=t.locations().filter(function(o){return o.name.toLowerCase().includes(e)});t.filteredLocations(o)}else t.filteredLocations([]);t.filterMarkers(e)},t.filterMarkers=function(e){var o=markers.filter(function(o){return-1==o.name.toLowerCase().indexOf(e)}),n=markers.filter(function(o){return-1!=o.name.toLowerCase().indexOf(e)});o.forEach(function(o){o.setMap(null)}),n.forEach(function(o){o.setMap(map)})},t.toggleNav=function(){var o=$(".list-container"),e=$(".toggle-icon");o.toggle(),o.is(":visible")?e.removeClass("fa-arrow-right").addClass("fa-arrow-left"):e.removeClass("fa-arrow-left").addClass("fa-arrow-right")}}var viewModel=new AppViewModel;function initMap(){var o=document.getElementById("map");map=new google.maps.Map(o,{center:{lat:37.855221,lng:-122.478831},zoom:14,mapTypeId:"roadmap"}),viewModel.locations().forEach(function(o,e){var n=new google.maps.Marker({position:o.position,map:map,name:o.name,image:o.image,rating:o.rating,address:o.address,id:e});infoWindow=new google.maps.InfoWindow,n.addListener("click",function(){infoWindow.setContent('\n            <div class="infoWindow">\n                <h3 class="name">'+n.name+'</h3>\n                <h4 class="rating">Yelp Rating: '+n.rating+"</h4>\n                <p>"+n.address+'</p>\n                <img src="'+n.image+'">\n            </div>\n            '),infoWindow.open(map,n),viewModel.signalHighlited(n)}),markers.push(n)})}function getLocationsFromYelp(){fetch("http://localhost:3333").then(function(o){200===o.status?o.json().then(function(o){o.forEach(function(o){o.highlighted=ko.observable(!1)}),viewModel.locations(o),viewModel.dataLoadError(!1),initMap()}):o.json().then(function(o){console.log("check the backend"),viewModel.locations(backupLocations),initMap()})}).catch(function(o){console.log("Fetch Error :-S",o),viewModel.locations(backupLocations),viewModel.dataLoadError(!0),alert("Error has occurred while loading data, results will be limited.."),initMap()})}getLocationsFromYelp(),ko.applyBindings(viewModel);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsibWFwIiwiaW5mb1dpbmRvdyIsIm1hcmtlcnMiLCJiYWNrdXBMb2NhdGlvbnMiLCJuYW1lIiwibGF0IiwibG5nIiwicG9zaXRpb24iLCJpbWFnZSIsInJhdGluZyIsImFkZHJlc3MiLCJrbyIsIm9ic2VydmFibGUiLCJoaWdobGlnaHRlZCIsIkFwcFZpZXdNb2RlbCIsInNlbGYiLCJmaWx0ZXJlZExvY2F0aW9ucyIsInNwaW5uZXIiLCJkYXRhTG9hZEVycm9yIiwib2JzZXJ2YWJsZUFycmF5Iiwic2lnbmFsSGlnaGxpdGVkIiwiZGF0YSIsImkiLCJsb2NhdGlvbnMiLCJsb2NhdGlvbiIsImxlbmd0aCIsIm1hcmtlciIsImRpc3BsYXlJbmZvV2luZG93IiwiaXRlbSIsImFuaW1hdGVCb3VuY2luZyIsImdpdmVuTWFya2VyIiwic2V0QW5pbWF0aW9uIiwiZ29vZ2xlIiwibWFwcyIsIkFuaW1hdGlvbiIsIkJPVU5DRSIsInNlYXJjaCIsInZhbHVlIiwiZmlsdGVyU3RyaW5nIiwibWFya2Vyc1RvSGlkZSIsInJlc3VsdCIsImZpbHRlciIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiZmlsdGVyTWFya2VycyIsIm5hdkNvbnRhaW5lciIsInRvZ2dsZUljb24iLCIkIiwicmVtb3ZlQ2xhc3MiLCJzZXRNYXAiLCJ2aWV3TW9kZWwiLCJ0b2dnbGUiLCJtYXBDb250YWluZXIiLCJkb2N1bWVudCIsIm1hcE9wdGlvbnMiLCJhZGRDbGFzcyIsIm1hcFR5cGVJZCIsInNldENvbnRlbnQiLCJjZW50ZXIiLCJ6b29tIiwiZm9yRWFjaCIsIk1hcmtlciIsImdldExvY2F0aW9uc0Zyb21ZZWxwIiwicmVzcG9uc2UiLCJpbml0TWFwIiwiYWRkTGlzdGVuZXIiLCJvcGVuIiwidGhlbiIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJhbGVydCIsImFwcGx5QmluZGluZ3MiXSwibWFwcGluZ3MiOiJhQUNB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T0FBT0QsS0FBSyxTQUFTL0MsR0FDMUJBLEVBQUt3QyxRQUFRLFNBQUVqQyxHQUNYQSxFQUFLZixZQUFjRixHQUFHQyxZQUFXLEtBRXJDdUMsVUFBVTVCLFVBQVVGLEdBQ3BCOEIsVUFBVWpDLGVBQWMsR0FDeEIrQyxZQWRBRCxFQUFTSyxPQUFPRCxLQUFNLFNBQUUvQyxHQUNwQmlELFFBQVFDLElBQUkscUJBQ1pwQixVQUFVNUIsVUFBVXBCLGlCQUNwQjhELGNBY1hPLE1BQU8sU0FBVUMsR0FDZEgsUUFBUUMsSUFBSSxrQkFBbUJFLEdBQy9CdEIsVUFBVTVCLFVBQVVwQixpQkFDcEJnRCxVQUFVakMsZUFBYyxHQUN4QndELE1BQU0sb0VBQ05ULFlBSVpGLHVCQUdBcEQsR0FBR2dFLGNBQWN4QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogR0xPQkFMIFZBUklBQkxFUyAqL1xyXG5sZXQgbWFwO1xyXG5sZXQgaW5mb1dpbmRvdztcclxuY29uc3QgbWFya2VycyA9IFtdO1xyXG5jb25zdCBiYWNrdXBMb2NhdGlvbnMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ1RoZSBUcmlkZW50JyxcclxuICAgICAgICBwb3NpdGlvbjoge2xhdDogMzcuODUzNDA1LCBsbmc6IC0xMjIuNDc4NzA4fSxcclxuICAgICAgICBpbWFnZTogJ2h0dHBzOi8vczMtbWVkaWEzLmZsLnllbHBjZG4uY29tL2JwaG90by9TYXZuc3dSbzhHSXZLMW5LYy1ib3lBL28uanBnJyxcclxuICAgICAgICByYXRpbmc6IDMuNSxcclxuICAgICAgICBhZGRyZXNzOiAnNTU4IEJyaWRnZXdheScsXHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdOYXBhIFZhbGxleSBCdXJnZXIgQ29tcGFueScsXHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDM3Ljg1NDYxNiwgbG5nOiAtMTIyLjQ3OTA1MX0sXHJcbiAgICAgICAgaW1hZ2U6ICdodHRwczovL3MzLW1lZGlhMi5mbC55ZWxwY2RuLmNvbS9icGhvdG8vYzRxTmEtbERpWmtNV1JDaXJYMWxnQS9vLmpwZycsXHJcbiAgICAgICAgcmF0aW5nOiA0LFxyXG4gICAgICAgIGFkZHJlc3M6ICc2NzAgQnJpZGdld2F5JyxcclxuICAgICAgICBoaWdobGlnaHRlZDoga28ub2JzZXJ2YWJsZShmYWxzZSlcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ0JhcnJlbCBIb3VzZSBUYXZlcm4nLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7bGF0OiAzNy44NTUyMjEsIGxuZzogLTEyMi40Nzg4MzF9LFxyXG4gICAgICAgIGltYWdlOiAnaHR0cHM6Ly9zMy1tZWRpYTMuZmwueWVscGNkbi5jb20vYnBob3RvL25kWVNYdmJxY3hJdGhQb2Y4bk5ib3cvby5qcGcnLFxyXG4gICAgICAgIHJhdGluZzogMy41LFxyXG4gICAgICAgIGFkZHJlc3M6ICc2NjAgQnJpZGdld2F5JyxcclxuICAgICAgICBoaWdobGlnaHRlZDoga28ub2JzZXJ2YWJsZShmYWxzZSlcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ0xpZ2h0aG91c2UgQ2FmZScsXHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDM3Ljg1NjQxMywgbG5nOiAtMTIyLjQ4MDA4MX0sXHJcbiAgICAgICAgaW1hZ2U6ICdodHRwczovL3MzLW1lZGlhNC5mbC55ZWxwY2RuLmNvbS9icGhvdG8vcng5cHg4bXJ4Z0NGS1UwaW1nMTJNQS9vLmpwZycsXHJcbiAgICAgICAgcmF0aW5nOiA0LFxyXG4gICAgICAgIGFkZHJlc3M6ICcxMzExIEJyaWRnZXdheScsXHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdTZWFmb29kIFBlZGRsZXInLFxyXG4gICAgICAgIHBvc2l0aW9uOiB7bGF0OiAzNy44NTY1NjcsIGxuZzogLTEyMi40NzgyMzV9LFxyXG4gICAgICAgIGltYWdlOiAnaHR0cHM6Ly9zMy1tZWRpYTEuZmwueWVscGNkbi5jb20vYnBob3RvL3A2eGRsWTN2cEctRzdXZUdBRllPeUEvby5qcGcnLFxyXG4gICAgICAgIHJhdGluZzogMy41LFxyXG4gICAgICAgIGFkZHJlc3M6ICczMDMgSm9obnNvbiBTdCcsXHJcbiAgICAgICAgaGlnaGxpZ2h0ZWQ6IGtvLm9ic2VydmFibGUoZmFsc2UpXHJcbiAgICB9XHJcbl07XHJcblxyXG5cclxuLyogS08gKi9cclxuZnVuY3Rpb24gQXBwVmlld01vZGVsKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgc2VsZi5zcGlubmVyID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmxvY2F0aW9ucyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuICAgIHNlbGYuZmlsdGVyZWRMb2NhdGlvbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuZmlsdGVyU3RyaW5nID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblxyXG4gICAgc2VsZi5kYXRhTG9hZEVycm9yID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblxyXG4gICAgLyogU0lOR0FMIEhJR0hMSUdIVCBTVEFURSBUTyBUSEUgVklFV01PREVMICovXHJcbiAgICBzZWxmLnNpZ25hbEhpZ2hsaXRlZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgc2VsZi5sb2NhdGlvbnMoKS5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gc2VsZi5sb2NhdGlvbnMoKVtpXTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCBsb2NhdGlvbi5uYW1lID09IG5hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oaWdobGlnaHRlZCh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbWFya2VyID0gbWFya2Vycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PSBuYW1lKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIG1hcmtlciApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbmltYXRlQm91bmNpbmcobWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwbGF5SW5mb1dpbmRvdyhtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oaWdobGlnaHRlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiAgU0VUIEJPVU5TSU5HIEFOSU1BVElPTiBPTiBNQVJLRVIgKi9cclxuICAgIHNlbGYuYW5pbWF0ZUJvdW5jaW5nID0gZnVuY3Rpb24gKGdpdmVuTWFya2VyKSB7XHJcbiAgICAgICAgbWFya2Vycy5mb3JFYWNoKCggbWFya2VyICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIG1hcmtlciA9PSBnaXZlbk1hcmtlciApIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlci5zZXRBbmltYXRpb24oZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0QW5pbWF0aW9uKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLyogRElTUExBWVMgQU4gSU5GT1dJTkRPVyBJRiBBIFJFU1RBVVJBTlQgSVMgSElHSExJR0hURUQgKi9cclxuICAgIHNlbGYuZGlzcGxheUluZm9XaW5kb3cgPSBmdW5jdGlvbihtYXJrZXIpIHtcclxuICAgICAgICBpbmZvV2luZG93LnNldENvbnRlbnQoIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9XaW5kb3dcIj5cclxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWVcIj4ke21hcmtlci5uYW1lfTwvaDM+XHJcbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJyYXRpbmdcIj5ZZWxwIFJhdGluZzogJHttYXJrZXIucmF0aW5nfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICA8cD4ke21hcmtlci5hZGRyZXNzfTwvcD5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHttYXJrZXIuaW1hZ2V9XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHNlbGYuZmlsdGVyU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICggdmFsdWUubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHNlbGYubG9jYXRpb25zKCkuZmlsdGVyKCggbG9jYXRpb24gKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb24ubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuZmlsdGVyZWRMb2NhdGlvbnMocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuZmlsdGVyZWRMb2NhdGlvbnMoW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmZpbHRlck1hcmtlcnModmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYuZmlsdGVyTWFya2VycyA9IGZ1bmN0aW9uKCB2YWx1ZSApIHtcclxuICAgICAgICBsZXQgbWFya2Vyc1RvSGlkZSA9IG1hcmtlcnMuZmlsdGVyKCggbWFya2VyICkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbHVlKSA9PSAtMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWFya2Vyc1RvRGlzcGxheSA9IG1hcmtlcnMuZmlsdGVyKCggbWFya2VyICkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFya2VyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbHVlKSAhPSAtMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBtYXJrZXJzVG9IaWRlLmZvckVhY2goKCBtYXJrZXIgKSA9PiB7XHJcbiAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFya2Vyc1RvRGlzcGxheS5mb3JFYWNoKCggbWFya2VyICkgPT4ge1xyXG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYudG9nZ2xlTmF2ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IG5hdkNvbnRhaW5lciA9ICQoJy5saXN0LWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGxldCB0b2dnbGVJY29uID0gJCgnLnRvZ2dsZS1pY29uJyk7XHJcblxyXG4gICAgICAgIG5hdkNvbnRhaW5lci50b2dnbGUoKVxyXG4gICAgICAgIGlmICggbmF2Q29udGFpbmVyLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAgICAgdG9nZ2xlSWNvbi5yZW1vdmVDbGFzcygnZmEtYXJyb3ctcmlnaHQnKS5hZGRDbGFzcygnZmEtYXJyb3ctbGVmdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0b2dnbGVJY29uLnJlbW92ZUNsYXNzKCdmYS1hcnJvdy1sZWZ0JykuYWRkQ2xhc3MoJ2ZhLWFycm93LXJpZ2h0JylcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmxldCB2aWV3TW9kZWwgPSBuZXcgQXBwVmlld01vZGVsKClcclxuXHJcbi8qIElOSVRJQUxJWklORyBUSEUgTUFQICovXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICAvLyBHRVQgVEhFIE1BUCBDT05UQUlORVIgQU5EIFNFVCBUSEUgT1BUSU9OU1xyXG4gICAgY29uc3QgbWFwQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG4gICAgY29uc3QgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICBjZW50ZXI6IHtsYXQ6IDM3Ljg1NTIyMSwgbG5nOiAtMTIyLjQ3ODgzMX0sXHJcbiAgICAgICAgem9vbTogMTQsXHJcbiAgICAgICAgbWFwVHlwZUlkOiAncm9hZG1hcCdcclxuICAgIH07XHJcblxyXG4gICAgLy9JTklUSUFMSVpFIFRIRSBNQVBcclxuICAgIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwQ29udGFpbmVyLCBtYXBPcHRpb25zKTtcclxuXHJcbiAgICAvKiBMT09QIFRPIENSRUFURSBNQVJLRVIgUEVSIEVBQ0ggTE9DQVRJT04gKi9cclxuICAgIHZpZXdNb2RlbC5sb2NhdGlvbnMoKS5mb3JFYWNoKCggbG9jYXRpb24sIGkgKSA9PiB7XHJcbiAgICAgICAgbGV0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogbG9jYXRpb24ucG9zaXRpb24sXHJcbiAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICBuYW1lOiBsb2NhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgICBpbWFnZTogbG9jYXRpb24uaW1hZ2UsXHJcbiAgICAgICAgICAgIHJhdGluZzogbG9jYXRpb24ucmF0aW5nLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBsb2NhdGlvbi5hZGRyZXNzLFxyXG4gICAgICAgICAgICBpZDogaVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XHJcblxyXG4gICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRDb250ZW50KCBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvV2luZG93XCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJuYW1lXCI+JHttYXJrZXIubmFtZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwicmF0aW5nXCI+WWVscCBSYXRpbmc6ICR7bWFya2VyLnJhdGluZ308L2g0PlxyXG4gICAgICAgICAgICAgICAgPHA+JHttYXJrZXIuYWRkcmVzc308L3A+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bWFya2VyLmltYWdlfVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCk7XHJcbiAgICAgICAgICAgIGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgICAgIHZpZXdNb2RlbC5zaWduYWxIaWdobGl0ZWQobWFya2VyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWFya2Vycy5wdXNoKG1hcmtlcik7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvY2F0aW9uc0Zyb21ZZWxwKCkge1xyXG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzMzMycpXHJcbiAgICAgICAgLnRoZW4oIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCApIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKCAoIGRhdGEgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrIHRoZSBiYWNrZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld01vZGVsLmxvY2F0aW9ucyhiYWNrdXBMb2NhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRNYXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCggaXRlbSApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmhpZ2hsaWdodGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdmlld01vZGVsLmxvY2F0aW9ucyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHZpZXdNb2RlbC5kYXRhTG9hZEVycm9yKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGluaXRNYXAoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCggZnVuY3Rpb24oIGVyciApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZldGNoIEVycm9yIDotUycsIGVycik7XHJcbiAgICAgICAgICAgIHZpZXdNb2RlbC5sb2NhdGlvbnMoYmFja3VwTG9jYXRpb25zKTtcclxuICAgICAgICAgICAgdmlld01vZGVsLmRhdGFMb2FkRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBoYXMgb2NjdXJyZWQgd2hpbGUgbG9hZGluZyBkYXRhLCByZXN1bHRzIHdpbGwgYmUgbGltaXRlZC4uJyk7XHJcbiAgICAgICAgICAgIGluaXRNYXAoKTtcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5nZXRMb2NhdGlvbnNGcm9tWWVscCgpO1xyXG5cclxuXHJcbmtvLmFwcGx5QmluZGluZ3Modmlld01vZGVsKTsiXX0=
