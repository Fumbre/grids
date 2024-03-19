(()=>{
  var map = L.map('map', {dragging: !L.Browser.mobile}).setView([55.768386179995304, 37.6330482641651], 15)

  var marker = L.divIcon({className: 'map-marker-icon'})

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([55.769710213870894, 37.63922171595701], {icon: marker}).addTo(map).bindPopup('107045, Москва, Даев переулок, дом 41, бизнес-центр «Даев Плаза», этаж 8, офис № 82')
  


  map.scrollWheelZoom.disable()
  
})();