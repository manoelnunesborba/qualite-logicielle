package esiea.api;

import static org.mockito.ArgumentMatchers.refEq;
import static org.mockito.Mockito.*;

import java.sql.SQLException;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.json.JSONArray;
import org.json.JSONObject;
import esiea.api.VoitureAPI;
import esiea.dao.ReponseVoiture;
import esiea.dao.VoitureDAO;
import esiea.metier.Voiture;
import esiea.metier.Voiture.Carburant;

public class VoitureAPITest {

    @Mock
    private VoitureDAO mockVoitureDAO;

    @InjectMocks
    private VoitureAPI voitureAPI;

    @Before
    public void setUp() {
        // Initialisation de Mockito et injection des mocks
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetVoituresJson_AllParameter() throws Exception {
        // Préparation des données de retour simulées
        Voiture voiture1 = new Voiture();
        voiture1.setId(1);
        voiture1.setMarque("Renault");
        voiture1.setModele("Vel Satis");
        voiture1.setAnnee(2008);
        voiture1.setPrix(5000);

        Voiture voiture2 = new Voiture();
        voiture2.setId(2);
        voiture2.setMarque("Citroën");
        voiture2.setModele("C5");
        voiture2.setAnnee(2010);
        voiture2.setPrix(7000);

        ReponseVoiture mockResponse = new ReponseVoiture();
        mockResponse.setData(new Voiture[] { voiture1, voiture2 });
        mockResponse.setVolume(2);

        // Simulation du comportement du DAO
        when(mockVoitureDAO.getVoitures(null, -1, -1)).thenReturn(mockResponse);

        // Appel de la méthode à tester
        String result = voitureAPI.getVoituresJson("all", "-1", "-1");

        // Vérification des résultats
        JSONObject resultJson = new JSONObject(result);
        assertEquals(2, resultJson.getInt("volume"));

        JSONArray voituresArray = resultJson.getJSONArray("voitures");
        assertEquals(2, voituresArray.length());

        JSONObject voiture1Json = new JSONObject(voituresArray.getString(0));
        assertEquals("Renault", voiture1Json.getString("marque"));
        assertEquals(5000, voiture1Json.getInt("prix"));

        JSONObject voiture2Json = new JSONObject(voituresArray.getString(1));
        assertEquals("Citroën", voiture2Json.getString("marque"));
        assertEquals(7000, voiture2Json.getInt("prix"));

        // Vérification de l'appel du mock
        verify(mockVoitureDAO).getVoitures(null, -1, -1);
    }

    @Test
    public void testGetVoituresJson_WithIdParameter() throws Exception {
        // Préparation des données de retour simulées
        Voiture voiture = new Voiture();
        voiture.setId(1);
        voiture.setMarque("Renault");
        voiture.setModele("Vel Satis");
        voiture.setAnnee(2008);
        voiture.setPrix(5000);

        ReponseVoiture mockResponse = new ReponseVoiture();
        mockResponse.setData(new Voiture[] { voiture });
        mockResponse.setVolume(1);

        // Simulation du comportement du DAO
        when(mockVoitureDAO.rechercherVoitures("1", -1, -1)).thenReturn(mockResponse);

        // Appel de la méthode à tester
        String result = voitureAPI.getVoituresJson("1", "-1", "-1");

        // Vérification des résultats
        JSONObject resultJson = new JSONObject(result);
        assertEquals(1, resultJson.getInt("volume"));

        JSONObject voitureJson = new JSONObject(resultJson.getString("voiture"));
        assertEquals("Renault", voitureJson.getString("marque"));
        assertEquals(5000, voitureJson.getInt("prix"));

        // Vérification de l'appel du mock
        verify(mockVoitureDAO).rechercherVoitures("1", -1, -1);
    }

    @Test
    public void testAjouterVoiture() throws Exception {
        // Préparation des données de test
        JSONObject voitureJson = new JSONObject();
        voitureJson.put("marque", "Renault");
        voitureJson.put("modele", "Vel Satis");
        voitureJson.put("annee", 2008);
        voitureJson.put("prix", 5000);
        voitureJson.put("id", 1);
        voitureJson.put("finition", "Allure");
        voitureJson.put("carburant", Carburant.DIESEL.toString());
        voitureJson.put("km", 100000);

        // Appel de la méthode à tester
        String result = voitureAPI.ajouterVoiture(voitureJson.toString());
        JSONObject resultJson = new JSONObject(result);
        assertTrue(resultJson.getBoolean("succes"));
        
        // Vérification de l'appel du mock
        Voiture voiture = voitureAPI.voitureFromJson(voitureJson);
        verify(mockVoitureDAO).ajouterVoiture(refEq(voiture));
    }

    @Test
    public void testSupprimerVoiture() throws Exception {
        // Préparation des données de test
        JSONObject voitureJson = new JSONObject();
        voitureJson.put("id", 1);

        // Appel de la méthode à tester
        String result = voitureAPI.supprimerVoiture(voitureJson.toString());
        JSONObject resultJson = new JSONObject(result);
        assertTrue(resultJson.getBoolean("succes"));

        // Vérification de l'appel du mock
        verify(mockVoitureDAO).supprimerVoiture(voitureJson.toString());
    }

    @Test
    public void testGetToutesVoiture() throws Exception {
        Voiture voiture1 = new Voiture();
        voiture1.setId(1);
        voiture1.setMarque("Renault");
        voiture1.setModele("Vel Satis");
        voiture1.setAnnee(2008);
        voiture1.setPrix(5000);

        Voiture voiture2 = new Voiture();
        voiture2.setId(2);
        voiture2.setMarque("Citroën");
        voiture2.setModele("C5");
        voiture2.setAnnee(2010);
        voiture2.setPrix(7000);

        ReponseVoiture mockResponse = new ReponseVoiture();
        mockResponse.setData(new Voiture[] { voiture1, voiture2 });
        mockResponse.setVolume(2);

        when(mockVoitureDAO.getVoitures(null, 5, 5)).thenReturn(mockResponse);

        ReponseVoiture result = voitureAPI.getToutesVoitures(5,5);

        assertEquals(2, result.getVolume());
        assertEquals(voiture1, result.getData()[0]);
        assertEquals(voiture2, result.getData()[1]);

        verify(mockVoitureDAO).getVoitures(null, 5, 5);
    }

    @Test
    public void testGetReponse() throws SQLException {
        Voiture voiture1 = new Voiture();
        voiture1.setId(1);
        voiture1.setMarque("Renault");
        voiture1.setModele("Vel Satis");
        voiture1.setAnnee(2008);
        voiture1.setPrix(5000);

        Voiture voiture2 = new Voiture();
        voiture2.setId(2);
        voiture2.setMarque("Citroën");
        voiture2.setModele("C5");
        voiture2.setAnnee(2010);
        voiture2.setPrix(7000);

        ReponseVoiture mockResponse = new ReponseVoiture();
        mockResponse.setData(new Voiture[] { voiture1, voiture2 });
        mockResponse.setVolume(2);

        when(mockVoitureDAO.rechercherVoitures("all", 2, 2)).thenReturn(mockResponse);

        ReponseVoiture result = voitureAPI.getReponse("all", 2, 2);

        assertEquals(2, result.getVolume());
        assertEquals(voiture1, result.getData()[0]);
        assertEquals(voiture2, result.getData()[1]);

        verify(mockVoitureDAO).rechercherVoitures("all", 2, 2);
    }

    @Test
    public void testVoitureFromJson() {
        JSONObject voitureJson = new JSONObject();
        voitureJson.put("marque", "Renault");
        voitureJson.put("modele", "Vel Satis");
        voitureJson.put("annee", 2008);
        voitureJson.put("prix", 5000);
        voitureJson.put("id", 1);
        voitureJson.put("finition", "Allure");
        voitureJson.put("carburant", Carburant.DIESEL.toString());
        voitureJson.put("km", 100000);

        Voiture result = voitureAPI.voitureFromJson(voitureJson);

        assertEquals("Renault", result.getMarque());
        assertEquals("Vel Satis", result.getModele());
        assertEquals(2008, result.getAnnee());
        assertEquals(5000, result.getPrix());
        assertEquals(1, result.getId());
        assertEquals("Allure", result.getFinition());
        assertEquals(Carburant.DIESEL, result.getCarburant());
        assertEquals(100000, result.getKm());
    }
}
