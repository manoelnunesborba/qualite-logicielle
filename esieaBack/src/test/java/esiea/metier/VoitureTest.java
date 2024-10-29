package esiea.metier;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import esiea.metier.Voiture.Carburant;

public class VoitureTest {

    private static Voiture voiture;

    @Before
    public void initVoiture(){
        voiture = new Voiture();
        voiture.setId(1);
        voiture.setMarque("Peugeot");
        voiture.setModele("208");
        voiture.setFinition("Allure");
        voiture.setCarburant(Carburant.DIESEL);
        voiture.setKm(10000);
        voiture.setAnnee(2018);
        voiture.setPrix(15000);
    }

    
    /**
     * Test pour vérifier que les méthode get et set id de la voiture fonctionnent correctement
     *
     * Scenario: Donner un ID à la Voiture
     * Given : La voiture a un ID de 1
     * When : L'ID est changé pour 2
     * Then : La méthode getId doit retourner 2
     *
     * Scenario: Donner un ID négatif à la Voiture
     * Given : La voiture a un ID de 2
     * When : L'ID est changé pour -1
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureID() {
        assertEquals(voiture.getId(), 1);
        voiture.setId(2);
        assertEquals(voiture.getId(), 2);
        voiture.setId(-1);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set marque de la voiture fonctionnent correctement
     *
     * Scenario: Donner une marque à la Voiture
     * Given : La voiture a une marque de "Peugeot"
     * When : La marque est changée pour "Renault"
     * Then : La méthode getMarque doit retourner "Renault"
     *
     * Scenario: Donner une marque nulle à la Voiture
     * Given : La voiture a une marque de "Renault"
     * When : La marque est changée pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureMarque() {
        assertEquals(voiture.getMarque(), "Peugeot");
        voiture.setMarque("Renault");
        assertEquals(voiture.getMarque(), "Renault");
        voiture.setMarque(null);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set modele de la voiture fonctionnent correctement
     *
     * Scenario: Donner un modèle à la Voiture
     * Given : La voiture a un modèle de "208"
     * When : Le modèle est changé pour "Clio"
     * Then : La méthode getModele doit retourner "Clio"
     *
     * Scenario: Donner un modèle nul à la Voiture
     * Given : La voiture a un modèle de "Clio"
     * When : Le modèle est changé pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureModele() {
        assertEquals(voiture.getModele(), "208");
        voiture.setModele("Clio");
        assertEquals(voiture.getModele(), "Clio");
        voiture.setModele(null);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set finition de la voiture fonctionnent correctement
     *
     * Scenario: Donner une finition à la Voiture
     * Given : La voiture a une finition de "Allure"
     * When : La finition est changée pour "GT"
     * Then : La méthode getFinition doit retourner "GT"
     *
     * Scenario: Donner une finition nulle à la Voiture
     * Given : La voiture a une finition de "GT"
     * When : La finition est changée pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureFinition() {
        assertEquals(voiture.getFinition(), "Allure");
        voiture.setFinition("GT");
        assertEquals(voiture.getFinition(), "GT");
        voiture.setFinition(null);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set carburant de la voiture fonctionnent correctement
     *
     * Scenario: Donner un carburant à la Voiture
     * Given : La voiture a un carburant de "DIESEL"
     * When : Le carburant est changé pour "ESSENCE"
     * Then : La méthode getCarburant doit retourner "ESSENCE"
     *
     * Scenario: Donner un carburant nul à la Voiture
     * Given : La voiture a un carburant de "ESSENCE"
     * When : Le carburant est changé pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureCarburant() {
        assertEquals(voiture.getCarburant(), Carburant.DIESEL);
        voiture.setCarburant(Carburant.ESSENCE);
        assertEquals(voiture.getCarburant(), Carburant.ESSENCE);
        voiture.setCarburant(null);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set km de la voiture fonctionnent correctement
     *
     * Scenario: Donner un nombre de km à la Voiture
     * Given : La voiture a 10000 km
     * When : Les km sont changés pour 20000
     * Then : La méthode getKm doit retourner 20000
     *
     * Scenario: Donner un nombre de km négatif à la Voiture
     * Given : La voiture a 20000 km
     * When : Les km sont changés pour -1
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureKm() {
        assertEquals(voiture.getKm(), 10000);
        voiture.setKm(20000);
        assertEquals(voiture.getKm(), 20000);
        voiture.setKm(-1);
        assertFalse(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode get et set annee de la voiture fonctionnent correctement
     *
     * Scenario: Donner une année à la Voiture
     * Given : La voiture a une année de 2018
     * When : L'année est changée pour 2019
     * Then : La méthode getAnnee doit retourner 2019
     *
     * Scenario: Donner une année négative à la Voiture
     * Given : La voiture a une année de 2019
     * When : L'année est changée pour 1800
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testVoitureAnnee() {
        assertEquals(voiture.getAnnee(), 2018);
        voiture.setAnnee(2019);
        assertEquals(voiture.getAnnee(), 2019);
        voiture.setAnnee(1800);
        assertFalse(voiture.check());
    }
    
    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur l'ID
     *
     * Scenario: Check l'ID de la Voiture
     * Given : La voiture a un ID de 1
     * When : L'ID de la voiture est vérifié
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check l'ID de la Voiture
     * Given : La voiture a un ID de 1
     * When : L'ID est changé pour -1
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureID(){
        assertTrue(voiture.check());
        voiture.setId(-1);
        assertFalse(voiture.check());
        voiture.setId(1);
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur la marque
     *
     * Scenario: Check la marque de la Voiture
     * Given : La voiture a une marque de "Peugeot"
     * When : La marque de la voiture est vérifiée
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check la marque de la Voiture
     * Given : La voiture a une marque de "Peugeot"
     * When : La marque est changée pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoiturerMarque(){
        assertTrue(voiture.check());
        voiture.setMarque(null);
        assertFalse(voiture.check());
        voiture.setMarque("Peugeot");
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur le modèle
     *
     * Scenario: Check le modèle de la Voiture
     * Given : La voiture a un modèle de "208"
     * When : Le modèle de la voiture est vérifié
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check le modèle de la Voiture
     * Given : La voiture a un modèle de "208"
     * When : Le modèle est changé pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureModele(){
        assertTrue(voiture.check());
        voiture.setModele(null);
        assertFalse(voiture.check());
        voiture.setModele("208");
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur la finition
     *
     * Scenario: Check la finition de la Voiture
     * Given : La voiture a une finition de "Allure"
     * When : La finition de la voiture est vérifiée
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check la finition de la Voiture
     * Given : La voiture a une finition de "Allure"
     * When : La finition est changée pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureFinition(){
        assertTrue(voiture.check());
        voiture.setFinition(null);
        assertFalse(voiture.check());
        voiture.setFinition("Allure");
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur le carburant
     *
     * Scenario: Check le carburant de la Voiture
     * Given : La voiture a un carburant de "DIESEL"
     * When : Le carburant de la voiture est vérifié
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check le carburant de la Voiture
     * Given : La voiture a un carburant de "DIESEL"
     * When : Le carburant est changé pour null
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureCarburant(){
        assertTrue(voiture.check());
        voiture.setCarburant(null);
        assertFalse(voiture.check());
        voiture.setCarburant(Carburant.DIESEL);
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur le nombre de km
     *
     * Scenario: Check le nombre de km de la Voiture
     * Given : La voiture a 10000 km
     * When : Le nombre de km de la voiture est vérifié
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check le nombre de km de la Voiture
     * Given : La voiture a 10000 km
     * When : Le nombre de km est changé pour -1
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureKm(){
        assertTrue(voiture.check());
        voiture.setKm(-1);
        assertFalse(voiture.check());
        voiture.setKm(10000);
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur l'année
     *
     * Scenario: Check l'année de la Voiture
     * Given : La voiture a une année de 2018
     * When : L'année de la voiture est vérifiée
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check l'année de la Voiture
     * Given : La voiture a une année de 2018
     * When : L'année est changée pour 1800
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureAnnee(){
        assertTrue(voiture.check());
        voiture.setAnnee(1800);
        assertFalse(voiture.check());
        voiture.setAnnee(2018);
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur le prix
     *
     * Scenario: Check le prix de la Voiture
     * Given : La voiture a un prix de 15000
     * When : Le prix de la voiture est vérifié
     * Then : La méthode check doit retourner true
     * 
     * Scenario: Check le prix de la Voiture
     * Given : La voiture a un prix de 15000
     * When : Le prix est changé pour -1
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoiturePrix(){
        assertTrue(voiture.check());
        voiture.setPrix(-1);
        assertFalse(voiture.check());
        voiture.setPrix(15000);
        assertTrue(voiture.check());
    }

    /**
     * Test pour vérifier que les méthode check de la voiture fonctionnent correctement sur une voiture sans information
     *
     * Scenario: Check une voiture sans information
     * Given : La voiture n'a pas d'information
     * When : La voiture est vérifiée
     * Then : La méthode check doit retourner false
     */
    @Test
    public void testCheckVoitureSansInformation(){
        Voiture voitureSansInformation = new Voiture();
        assertFalse(voitureSansInformation.check());
    }

    /**
     * Test pour vérifier que la méthode surcharge toString de la voiture fonctionne correctement
     *
     * Scenario: Check une voiture avec des informations
     * Given : La voiture a des informations
     * When : Récupérer la représentation en JSON de la voiture
     * Then : La méthode toString doit retourner un JSON de la voiture
     */
    @Test
    public void testToString(){

        assertEquals(voiture.toString(), "{\"id\":1,\"marque\":\"Peugeot\",\"modele\":\"208\",\"finition\":\"Allure\",\"carburant\":\"DIESEL\",\"km\":10000,\"annee\":2018,\"prix\":15000}");
    }

    /**
     * Test pour vérifier que la méthode getTypeDonnee de la voiture fonctionne correctement
     *
     * Scenario: Vérifier le type de données d'une voiture
     * Given : Une colonne de voiture
     * When : Récupérer le type de données de la colonne
     * Then : La méthode getTypeDonnee doit retourner le type de données de la colonne
     */
    @Test
    public void testVoitureGetTypeDonnees(){
        assertEquals("", Voiture.getTypeDonnee(""));
        assertEquals("string", Voiture.getTypeDonnee("marque"));
        assertEquals("string", Voiture.getTypeDonnee("modele"));
        assertEquals("string", Voiture.getTypeDonnee("finition"));
        assertEquals("", Voiture.getTypeDonnee("carburant"));
        assertEquals("entier", Voiture.getTypeDonnee("km"));
        assertEquals("entier", Voiture.getTypeDonnee("annee"));
        assertEquals("entier", Voiture.getTypeDonnee("prix"));   
    }

    /**
     * Test pour vérifier que le type énuméré Carburant de la voiture fonctionne correctement
     *
     * Scenario: Vérifier le type de carburant
     * Given : Un type de carburant
     * When : Récupérer le type de carburant
     * Then : La méthode get doit retourner le type de carburant
     */
    @Test
    public void testGetTypeDeCarburant(){
        assertEquals(Carburant.get("D"), Carburant.DIESEL);
        assertEquals(Carburant.get("E"), Carburant.ESSENCE);
        assertEquals(Carburant.get("W"), Carburant.ELECTRIQUE);
        assertEquals(Carburant.get("H"), Carburant.HYBRIDE);
        assertEquals(Carburant.get("A"), null);
        assertEquals(Carburant.get("test"), null);
    }

    /**
     * Test pour vérifier que la méthode toString du type énuméré Carburant de la voiture fonctionne correctement
     *
     * Scenario: Vérifier le type de carburant
     * Given : Un type de carburant
     * When : Récupérer le type de carburant
     * Then : La méthode toString doit retourner le type de carburant
     */
    @Test
    public void testCarburantToString(){
        assertEquals(Carburant.DIESEL.toString(), "D");
        assertEquals(Carburant.ESSENCE.toString(), "E");
        assertEquals(Carburant.ELECTRIQUE.toString(), "W");
        assertEquals(Carburant.HYBRIDE.toString(), "H");
    }

}
