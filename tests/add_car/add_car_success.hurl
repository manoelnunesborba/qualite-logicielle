# Add a car with the proper json schema awaited by the backend
POST http://localhost:8080/esieaBack/rest/voiture/add
{
    "id": 1,
    "marque": "Peugeot",
    "modele": "208",
    "finition": "Allure",
    "carburant": "E",
    "km": 10000,
    "annee": 2018,
    "prix": 15000
}
HTTP 200
[Asserts]
header "Content-Type" == "application/json"
jsonpath "$.succes" isBoolean
jsonpath "$.succes" == true