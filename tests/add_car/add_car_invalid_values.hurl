# Add a car with the proper json schema but invalid values
POST http://localhost:8080/esieaBack/rest/voiture/add
{
    "id": "NaN",
    "marque": "Peugeot",
    "modele": "208",
    "finition": "Allure",
    "carburant": "W",
    "km": -10000,
    "annee": 5000,
    "prix": -15000
}
HTTP 400