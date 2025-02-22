var mymap = L.map('mapid', { preferCanvas: true }).setView(
  [39.73865208, -104.98546635],
  16
);

const markerLayerGroup = L.layerGroup().addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var governmentEntities = [
  'CITY & COUNTY OF DENVER',
  'UNITED STATES OF AMERICA',
  'STATE OF COLORADO',
  'DENVER SCHOOL FACILITIES LEASING CORPORATION',
  'SCHOOL DISTRICT NO 1',
  'HOUSING AUTHORITY OF THE CITY & COUNTY OF DENVER'
];

const setMarkers = (addressesToMap) => {
  markerLayerGroup.clearLayers();
  addressesToMap.forEach((addressWithInfo, index) => {
    const {
      address,
      lat,
      long,
      ownerName,
      allOwnedProperties,
    } = addressWithInfo;
    try {
      const marker = L.circleMarker([parseFloat(lat), parseFloat(long)], {
        radius: 5,
        ...(governmentEntities.includes(ownerName) && {
          color: '#ff0000',
          opacity: 0.5,
        }),
      }).addTo(markerLayerGroup);
      marker.bindPopup(
        `${address} <br> <strong>Owned By</strong>: ${ownerName} <br> <strong>All Properties Owned</strong>: <br>${
          allOwnedProperties.length > 25
            ? allOwnedProperties.length
            : allOwnedProperties.join(', ')
        }`
      );
    } catch (err) {
      console.log(index);
    }
  });
};

const updateMinimum = (value) => {
  const filteredAddresses = addressInfo.filter(
    ({ allOwnedProperties }) => allOwnedProperties.length >= value
  );
  setMarkers(filteredAddresses);
};

updateMinimum(document.querySelector('#minimumProperties').value)

