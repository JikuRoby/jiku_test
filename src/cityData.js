const cityData = [
  {
    "city": "Tirana",
    "latitude": 41.33,
    "longitude": 19.82
  },
  {
    "city": "Andorra la Vella",
    "latitude": 42.51,
    "longitude": 1.52
  },
  {
    "city": "Vienna",
    "latitude": 48.21,
    "longitude": 16.37
  },
  {
    "city": "Minsk",
    "latitude": 53.9,
    "longitude": 27.57
  },
  {
    "city": "Brussels",
    "latitude": 50.85,
    "longitude": 4.35
  },
  {
    "city": "Sarajevo",
    "latitude": 43.85,
    "longitude": 18.36
  },
  {
    "city": "Sofia",
    "latitude": 42.7,
    "longitude": 23.32
  },
  {
    "city": "Zagreb",
    "latitude": 45.81,
    "longitude": 15.98
  },
  {
    "city": "Nicosia",
    "latitude": 35.17,
    "longitude": 33.37
  },
  {
    "city": "Prague",
    "latitude": 50.09,
    "longitude": 14.42
  },
  {
    "city": "Copenhagen",
    "latitude": 55.68,
    "longitude": 12.57
  },
  {
    "city": "Tallinn",
    "latitude": 59.44,
    "longitude": 24.75
  },
  {
    "city": "Helsinki",
    "latitude": 60.17,
    "longitude": 24.94
  },
  {
    "city": "Paris",
    "latitude": 48.85,
    "longitude": 2.35
  },
  {
    "city": "Berlin",
    "latitude": 52.52,
    "longitude": 13.41
  },
  {
    "city": "Gibraltar",
    "latitude": 36.14,
    "longitude": -5.35
  },
  {
    "city": "Athens",
    "latitude": 37.98,
    "longitude": 23.72
  },
  {
    "city": "St Peter Port",
    "latitude": 49.46,
    "longitude": -2.54
  },
  {
    "city": "Budapest",
    "latitude": 47.5,
    "longitude": 19.04
  },
  {
    "city": "Reykjavik",
    "latitude": 64.14,
    "longitude": -21.9
  },
  {
    "city": "Dublin",
    "latitude": 53.33,
    "longitude": -6.25
  },
  {
    "city": "Douglas",
    "latitude": 54.15,
    "longitude": -4.48
  },
  {
    "city": "Rome",
    "latitude": 41.89,
    "longitude": 12.48
  },
  {
    "city": "Saint Helier",
    "latitude": 49.19,
    "longitude": -2.1
  },
  {
    "city": "Pristina",
    "latitude": 42.67,
    "longitude": 21.17
  },
  {
    "city": "Riga",
    "latitude": 56.95,
    "longitude": 24.11
  },
  {
    "city": "Vaduz",
    "latitude": 47.14,
    "longitude": 9.52
  },
  {
    "city": "Vilnius",
    "latitude": 54.69,
    "longitude": 25.28
  },
  {
    "city": "Luxembourg",
    "latitude": 49.61,
    "longitude": 6.13
  },
  {
    "city": "Skopje",
    "latitude": 42.0,
    "longitude": 21.43
  },
  {
    "city": "Valletta",
    "latitude": 35.9,
    "longitude": 14.51
  },
  {
    "city": "Chisinau",
    "latitude": 47.01,
    "longitude": 28.86
  },
  {
    "city": "Monaco",
    "latitude": 43.73,
    "longitude": 7.42
  },
  {
    "city": "Podgorica",
    "latitude": 42.44,
    "longitude": 19.26
  },
  {
    "city": "Amsterdam",
    "latitude": 52.37,
    "longitude": 4.89
  },
  {
    "city": "Oslo",
    "latitude": 59.91,
    "longitude": 10.75
  },
  {
    "city": "Warsaw",
    "latitude": 52.23,
    "longitude": 21.01
  },
  {
    "city": "Lisbon",
    "latitude": 38.72,
    "longitude": -9.13
  },
  {
    "city": "Bucharest",
    "latitude": 44.43,
    "longitude": 26.11
  },
  {
    "city": "Moscow",
    "latitude": 55.75,
    "longitude": 37.62
  },
  {
    "city": "San Marino",
    "latitude": 43.94,
    "longitude": 12.45
  },
  {
    "city": "Belgrade",
    "latitude": 44.8,
    "longitude": 20.47
  },
  {
    "city": "Bratislava",
    "latitude": 48.15,
    "longitude": 17.11
  },
  {
    "city": "Ljubljana",
    "latitude": 46.05,
    "longitude": 14.51
  },
  {
    "city": "Madrid",
    "latitude": 40.42,
    "longitude": -3.7
  },
  {
    "city": "Longyearbyen",
    "latitude": 78.22,
    "longitude": 15.64
  },
  {
    "city": "Stockholm",
    "latitude": 59.33,
    "longitude": 18.06
  },
  {
    "city": "Berne",
    "latitude": 46.95,
    "longitude": 7.45
  },
  {
    "city": "Kiev",
    "latitude": 50.45,
    "longitude": 30.52
  },
  {
    "city": "London",
    "latitude": 51.51,
    "longitude": -0.13
  },
  {
    "city": "Vatican",
    "latitude": 41.9,
    "longitude": 12.45
  },
  {
    "city": "Albania",
    "latitude": 41.16667,
    "longitude": 19.81667
  },
  {
    "city": "Andorra",
    "latitude": 42.5,
    "longitude": 1.5
  },
  {
    "city": "Austria",
    "latitude": 47.0,
    "longitude": 13.0
  },
  {
    "city": "Belgium",
    "latitude": 50.0,
    "longitude": 4.0
  },
  {
    "city": "Bosnia and Herzegovina",
    "latitude": 43.0,
    "longitude": 16.0
  },
  {
    "city": "Bulgaria",
    "latitude": 43.0,
    "longitude": 25.0
  },
  {
    "city": "Croatia",
    "latitude": 45.0,
    "longitude": 15.0
  },
  {
    "city": "Cyprus",
    "latitude": 35.0,
    "longitude": 33.0
  },
  {
    "city": "Czech Republic",
    "latitude": 50.0,
    "longitude": 15.0
  },
  {
    "city": "Czechia",
    "latitude": 50.0,
    "longitude": 15.0
  },
  {
    "city": "Denmark",
    "latitude": 55.0,
    "longitude": 10.0
  },
  {
    "city": "Estonia",
    "latitude": 58.0,
    "longitude": 25.0
  },
  {
    "city": "Finland",
    "latitude": 65.0,
    "longitude": 25.0
  },
  {
    "city": "France",
    "latitude": 46.0,
    "longitude": 2.0
  },
  {
    "city": "Georgia",
    "latitude": 43.0,
    "longitude": 41.0
  },
  {
    "city": "Germany",
    "latitude": 50.0,
    "longitude": 10.0
  },
  {
    "city": "Greece",
    "latitude": 39.0,
    "longitude": 21.0
  },
  {
    "city": "Hungary",
    "latitude": 47.0,
    "longitude": 19.0
  },
  {
    "city": "Ireland",
    "latitude": 53.0,
    "longitude": -8.0
  },
  {
    "city": "Iceland",
    "latitude": 64.0,
    "longitude": -18.0
  },
  {
    "city": "Italy",
    "latitude": 42.0,
    "longitude": 12.0
  },
  {
    "city": "Latvia",
    "latitude": 57.0,
    "longitude": 25.0
  },
  {
    "city": "Liechtenstein",
    "latitude": 47.0,
    "longitude": 9.0
  },
  {
    "city": "Lithuania",
    "latitude": 55.0,
    "longitude": 25.0
  },
  {
    "city": "Luxembourg",
    "latitude": 49.0,
    "longitude": 6.0
  },
  {
    "city": "North Macedonia",
    "latitude": 42.0,
    "longitude": 21.0
  },
  {
    "city": "Malta",
    "latitude": 35.0,
    "longitude": 14.0
  },
  {
    "city": "Moldova",
    "latitude": 47.0,
    "longitude": 28.0
  },
  {
    "city": "Monaco",
    "latitude": 43.71667,
    "longitude": 7.41667
  },
  {
    "city": "Montenegro",
    "latitude": 42.0,
    "longitude": 19.0
  },
  {
    "city": "Netherlands",
    "latitude": 52.0,
    "longitude": 5.0
  },
  {
    "city": "Norway",
    "latitude": 62.0,
    "longitude": 10.0
  },
  {
    "city": "Poland",
    "latitude": 52.0,
    "longitude": 19.0
  },
  {
    "city": "Portugal",
    "latitude": 39.0,
    "longitude": -9.0
  },
  {
    "city": "United Kingdom",
    "latitude": 52.0,
    "longitude": -2.0
  },
  {
    "city": "Romania",
    "latitude": 45.0,
    "longitude": 25.0
  },
  {
    "city": "Russia",
    "latitude": 60.0,
    "longitude": 30.0
  },
  {
    "city": "San Marino",
    "latitude": 43.71667,
    "longitude": 12.41667
  },
  {
    "city": "Serbia",
    "latitude": 44.0,
    "longitude": 20.0
  },
  {
    "city": "Slovakia",
    "latitude": 48.0,
    "longitude": 17.0
  },
  {
    "city": "Slovenia",
    "latitude": 46.0,
    "longitude": 14.0
  },
  {
    "city": "Spain",
    "latitude": 40.0,
    "longitude": -4.0
  },
  {
    "city": "Sweden",
    "latitude": 60.0,
    "longitude": 18.0
  },
  {
    "city": "Switzerland",
    "latitude": 47.0,
    "longitude": 8.0
  },
  {
    "city": "Turkey",
    "latitude": 39.0,
    "longitude": 35.0
  },
  {
    "city": "Türkiye",
    "latitude": 39.0,
    "longitude": 35.0
  },
  {
    "city": "Ukraine",
    "latitude": 48.0,
    "longitude": 30.0
  }
];

export { cityData };