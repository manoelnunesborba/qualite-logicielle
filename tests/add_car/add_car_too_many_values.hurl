# Add a car with too many values
POST http://localhost:8080/esieaBack/rest/voiture/add
{
    "id": 1,
    "marque": "Peugeot",
    "modele": "208",
    "finition": "Allure",
    "carburant": "E",
    "km": 10000,
    "annee": 2018,
    "prix": 15000,
    "couleur": "Rouge",
    "boite": "M",
    "nbPortes": 5,
    "nbPlaces": 5,
    "puissance": 100,
    "conso": 5.5,
    "co2": 100,
    "critair": 1,
    "img": "https://myimage.com",
    "options": ["Climatisation", "GPS", "Radar de recul"],
    "equipements": ["ABS", "ESP", "Airbag"],
    "commentaires": "Très bon état",
    "vendeur": "M. Dupont",
    "tel": "0601020304",
    "ville": "Paris",
    "cp": "75000",
    "date": "2021-01-01"
}
HTTP 400