GET http://localhost:8080/esieaBack/rest/voiture/get/1
HTTP 200

[Asserts]
# # This fails because voitures are not serialized
jsonpath "$.voiture.id" == 1