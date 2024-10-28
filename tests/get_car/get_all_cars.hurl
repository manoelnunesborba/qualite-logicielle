GET http://localhost:8080/esieaBack/rest/voiture/get/all
HTTP 200

[Captures]
volume: jsonpath "$.volume"


[Asserts]
header "Content-Type" == "application/json"
jsonpath "$.volume" isInteger
jsonpath "$.volume" >= 0
jsonpath "$.voitures" isCollection
jsonpath "$.voitures" count ==  {{volume}}
# each voiture is not properly serialized and is just a string instead of an object, this fails this test
jsonpath "$.voitures[0].id" isInteger