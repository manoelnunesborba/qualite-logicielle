global.config = {
  urlBack: "http://example.com/api",
  ligneParPage: 5,
};
// Mock the fetch API globally
global.fetch = jest.fn((url) => {
  if (
    url ===
    `${global.config.urlBack}/voiture/get/all/${0}/${
      global.config.ligneParPage
    }`
  ) {
    return Promise.resolve({
      ok: true, // Simulate a successful response
      json: () =>
        Promise.resolve({
          volume: 102,
          voitures: [
            '{"id":26238,"marque":"Panzerkampfwagen VI Tiger II","modele":"Sd Kfz 182","finition":"700 ch 860 litres Canon 88 mm","carburant":"ESSENCE","km":10000,"annee":1942,"prix":1000000}',
            '{"id":26239,"marque":"Panzerkampfwagen VI Tiger II","modele":"Sd Kfz 182","finition":"700 ch 860 litres Canon 88 mm","carburant":"ESSENCE","km":10000,"annee":1942,"prix":1000000}',
            '{"id":26241,"marque":"Panzerkampfwagen VI Tiger II","modele":"Sd Kfz 182","finition":"700 ch 860 litres Canon 88 mm","carburant":"ESSENCE","km":10000,"annee":1942,"prix":1000000}',
            '{"id":26242,"marque":"Panzerkampfwagen VI Tiger II","modele":"Sd Kfz 182","finition":"700 ch 860 litres Canon 88 mm","carburant":"ESSENCE","km":10000,"annee":1942,"prix":1000000}',
            '{"id":26243,"marque":"Panzerkampfwagen VI Tiger II","modele":"Sd Kfz 182","finition":"700 ch 860 litres Canon 88 mm","carburant":"ESSENCE","km":10000,"annee":1942,"prix":1000000}',
          ],
        }),
    });
  } else {
    return Promise.reject(new Error("Invalid URL"));
  }
});

document.body.innerHTML = '<div id="root"></div>';
global.root = document.getElementById("root");

/// MARK: import

const {
  afficherTableauListeVoitures,
  effacerFormulaire,
  cacherFormulaireCreation,
  genererEntetesListeVoitures,
  ajouterContenuListeVoitures,
  afficherSnackbar,
  calculerNbPages,
  afficherVoiture,
  afficherBlocVoiture,
  genererTableauListeVoitures,
  selectionnerPage,
  afficherFormulaireCreation,
  genererPagination,
  supprimerVoiture,
  ajouterVoiture,
  paginer,
  dispatchContexte,
  rechercher,
  accueil,
} = require("./esieaFront/src/main/webapp/stockcar.js");

///MARK: 1- Tests
describe("Test afficherTableauListeVoitures", () => {
  test("fetches voiture data from the API", async () => {
    document.body.innerHTML = `
    <input id="marque" type="text" value="some value">
      <input id="modele" value="some value">
      <input id="finition" value="some value">
      <input id="carburant" value="some value">
      <input id="km" value="some value">
      <input id="annee" value="some value">
      <input id="prix" value="some value">
      <div id="saisieRecherche"></div>
      <div id="pages"><a class="active">1</a></div>
      <div id="listeVoiture"></div>
      <div class="pagination">
        <a class="previous"></a>
        <a class="next disabled"></a>
      </div>
      
      <div id="nouvelle" style="display: block;"></div>
      <div id="fiche" style="display: none;"></div>
      <div id="recherche" style="display: none;"></div>
      <div class="pagination" style="display: none;"></div>

    `;
    // Call the function and wait for it to finish
    afficherTableauListeVoitures(1);
    expect(fetch).toHaveBeenCalledWith(
      "http://example.com/api/voiture/get/all/0/5"
    );
    await setTimeout(() => {
      expect(document.getElementById("marque").value).toBe("");
      expect(document.getElementById("modele").value).toBe("");
      expect(document.getElementById("finition").value).toBe("");
      expect(document.getElementById("carburant").value).toBe("");
      expect(document.getElementById("km").value).toBe("");
      expect(document.getElementById("annee").value).toBe("");
      expect(document.getElementById("prix").value).toBe("");
    }, 1000);
  });
});
describe("afficherSnackbar", () => {
  test('afficherSnackbar affiche le message Snackbar', async () => {
    jest.useFakeTimers();
    document.body.innerHTML = '<div id="test-snackbar" class="snackbar"></div>';
  
    // Appeler la méthode afficherSnackbar avec l'id de l'élément
    afficherSnackbar('test-snackbar');
  
    // Vérifier que la classe "show" a été ajoutée à l'élément
    const snackbar = document.getElementById('test-snackbar');
    expect(snackbar.classList.contains('show')).toBe(true);
    console.log(document.body.innerHTML )
    // Utiliser jest.runAllTimers pour avancer le temps et vérifier que la classe "show" est retirée après 3 secondes
    await jest.runAllTimers();
    console.log(document.body.innerHTML )
    expect(snackbar.classList.contains('show')).toBe(false);
  });})
describe("supprimerVoiture", () => {
  // let fetchMock;
  // let contenuVoiture, divSupprimer;
  // beforeEach(() => {
  //   // Set up the necessary DOM elements
  //   document.body.innerHTML = `<!DOCTYPE html>
  //                             <html lang="en">
  //                             <head>
  //                                 <meta charset="UTF-8">
  //                                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //                                 <title>Test Page</title>
  //                             </head>
  //                             <body>
  //                                 <div id="contenuVoiture"></div>
  //                                 <div id="divSupprimer"></div>
  //                                 <div id="snackbar_suppression"></div>
  //                             </body>
  //                             </html>`;
  //   // Mock the fetch function
  //   fetchMock = jest.spyOn(global, 'fetch');
  // });
  // afterEach(() => {
  //   // Clean up the DOM elements
  //   document.body.removeChild(contenuVoiture);
  //   document.body.removeChild(divSupprimer);
  //   // Restore the fetch function
  //   fetchMock.mockRestore();
  // });
  // test('should remove car and display success snackbar on successful deletion', async () => {
  //   // Mock the fetch response
  //   fetchMock.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ succes: true })
  //   });
  //   console.log("document1", document.body.innerHTML);
  //   supprimerVoiture(1);
  //   return fetch.mock.results[0].value
  //   .then(() => {
  //     // Assert that fetch was called with correct params
  //     expect(fetch).toHaveBeenCalledWith(
  //       `${config.urlBack}/voiture/del/`,
  //       expect.objectContaining({
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(1),
  //       })
  //     );
  //     expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/voiture/del/'), expect.any(Object));
  //     console.log("document2", document.body.innerHTML);
  //     // Check DOM and snackbar interactions
  //     expect(document.getElementById('contenuVoiture')).toBeNull();
  //     expect(document.getElementById('divSupprimer')).toBeNull();
  //   });
  // });
  // test('should display error snackbar on API error', async () => {
  //   // Mock the fetch response
  //   fetchMock.mockResolvedValueOnce({
  //     ok: false
  //   });
  //   // Mock the necessary functions
  //   global.afficherSnackbar = jest.fn();
  //   await supprimerVoiture(1);
  //   document.body.innerHTML = '<div id="snackbar"></div>';
  //   const snackbar = document.getElementById('snackbar');
  //   expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/voiture/del/'), expect.any(Object));
  //   expect(snackbar.classList.contains('show')).toBe(true);
  // });
  // test('should display error snackbar on unsuccessful deletion', async () => {
  //   // Mock the fetch response
  //   fetchMock.mockResolvedValueOnce({
  //     ok: true,
  //     json: async () => ({ succes: false })
  //   });
  //   // Mock the necessary functions
  //   global.afficherSnackbar = jest.fn();
  //   await supprimerVoiture(1);
  //   expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/voiture/del/'), expect.any(Object));
  //   expect(afficherSnackbar).toHaveBeenCalledWith('snackbar_erreur');
  // });
  // test('should handle fetch error', async () => {
  //   // Mock the fetch response
  //   fetchMock.mockRejectedValueOnce(new Error('Fetch error'));
  //   // Mock the necessary functions
  //   global.afficherSnackbar = jest.fn();
  //   await supprimerVoiture(1);
  //   expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/voiture/del/'), expect.any(Object));
  //   expect(afficherSnackbar).not.toHaveBeenCalledWith('snackbar_suppression');
  //   expect(afficherSnackbar).not.toHaveBeenCalledWith('snackbar_erreur');
  // });
});

describe("Test clearing form fields", () => {
  test("should clear all form fields", () => {
    // Set up the necessary DOM elements
    document.body.innerHTML = `
      <input id="marque" value="some value">
      <input id="modele" value="some value">
      <input id="finition" value="some value">
      <input id="carburant" value="some value">
      <input id="km" value="some value">
      <input id="annee" value="some value">
      <input id="prix" value="some value">
    `;

    // Run the code snippet
    effacerFormulaire();

    // Verify that all fields are cleared
    expect(document.getElementById("marque").value).toBe("");
    expect(document.getElementById("modele").value).toBe("");
    expect(document.getElementById("finition").value).toBe("");
    expect(document.getElementById("carburant").value).toBe("");
    expect(document.getElementById("km").value).toBe("");
    expect(document.getElementById("annee").value).toBe("");
    expect(document.getElementById("prix").value).toBe("");
  });
});

describe("Test displaying elements", () => {
  test("should display and hide the correct elements", () => {
    // Set up the necessary DOM elements
    document.body.innerHTML = `
      <div id="nouvelle" style="display: block;"></div>
      <div id="fiche" style="display: none;"></div>
      <div id="recherche" style="display: none;"></div>
      <div class="pagination" style="display: none;"></div>
    `;

    // Run the code snippet
    cacherFormulaireCreation();

    // Verify that the elements have the correct display styles
    expect(document.getElementById("nouvelle").style.display).toBe("none");
    expect(document.getElementById("fiche").style.display).toBe("block");
    expect(document.getElementById("recherche").style.display).toBe("block");
    expect(document.querySelector("div.pagination").style.display).toBe(
      "block"
    );
  });
});
describe("Test afficherVoiture", () => {
  beforeAll(() => {
    // Set up the necessary configuration object
    global.config = { urlBack: "http://example.com/api" };
  });

  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn((url) => {
      if (url === `${global.config.urlBack}/voiture/get/1`) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ voiture: { id: 1, marque: "Citroen" } }),
        });
      } else {
        return Promise.resolve({ ok: false });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch car data and display it correctly", async () => {
    await afficherVoiture(1);
    expect(fetch).toHaveBeenCalledWith("http://example.com/api/voiture/get/1");
  });
});

/// MARK: 2- Test independent function

describe("Test genererEntetesListeVoitures", () => {
  test("should generate table headers correctly", () => {
    const thead = genererEntetesListeVoitures();

    expect(thead.tagName).toBe("THEAD");

    const expectedHeaders = [
      "Marque",
      "Modèle",
      "Finition",
      "Carburant",
      "Kilométrage",
      "Année",
      "Prix",
      " ",
    ];
    const cells = thead.querySelectorAll("td");
    expect(cells.length).toBe(expectedHeaders.length);

    cells.forEach((cell, index) => {
      expect(cell.innerHTML).toBe(expectedHeaders[index]);
    });
  });
});

describe("Test ajouterContenuListeVoitures", () => {
  test("should add car data to the table correctly", () => {
    document.body.innerHTML = '<table id="testTable"></table>';
    const table = document.getElementById("testTable");

    const mockData = {
      voitures: [
        JSON.stringify({
          id: 1,
          marque: "Citroen",
          modele: "C3",
          finition: "Blanche",
          carburant: "Disesel",
          km: 50000,
          annee: 2018,
          prix: 15000,
        }),
        JSON.stringify({
          id: 2,
          marque: "Renault",
          modele: "Twingo",
          finition: "Clim",
          carburant: "Essence",
          km: 30000,
          annee: 2019,
          prix: 18000,
        }),
      ],
    };

    ajouterContenuListeVoitures(table, mockData);

    const tbody = table.querySelector("tbody");
    expect(tbody).not.toBeNull();

    // Verify that the <tbody> contains the correct rows and cells with the expected content
    const rows = tbody.querySelectorAll("tr");
    expect(rows.length).toBe(mockData.voitures.length);

    const expectedValues = [
      [
        "Citroen",
        "C3",
        "Blanche",
        "Disesel",
        "50000",
        "2018",
        "15000 €",
        "Détails",
      ],
      [
        "Renault",
        "Twingo",
        "Clim",
        "Essence",
        "30000",
        "2019",
        "18000 €",
        "Détails",
      ],
    ];

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll("td");
      expect(cells.length).toBe(expectedValues[rowIndex].length);

      cells.forEach((cell, cellIndex) => {
        if (cellIndex === cells.length - 1) {
          // Check the 'Détails' link
          const link = cell.querySelector("a");
          expect(link).not.toBeNull();
          expect(link.innerHTML).toBe(expectedValues[rowIndex][cellIndex]);
          expect(link.getAttribute("href")).toBe("#");
          expect(link.getAttribute("onclick")).toBe(
            `afficherVoiture(${rowIndex + 1})`
          );
        } else {
          expect(cell.innerHTML).toBe(expectedValues[rowIndex][cellIndex]);
        }
      });
    });
  });
});


describe("Test calculerNbPages", () => {
  beforeAll(() => {
    global.config = { ligneParPage: 10 };
  });

  test("should calculate the correct number of pages", () => {
    // Test cases
    const testCases = [
      { nbLignes: 0, expected: 0 },
      { nbLignes: 5, expected: 1 },
      { nbLignes: 10, expected: 1 },
      { nbLignes: 15, expected: 2 },
      { nbLignes: 20, expected: 2 },
      { nbLignes: 25, expected: 3 },
    ];

    // Run the test cases
    testCases.forEach(({ nbLignes, expected }) => {
      const result = calculerNbPages(nbLignes);
      expect(result).toBe(expected);
    });
  });
});

describe("afficherBlocVoiture", () => {
  let root;

  beforeEach(() => {
    // Mock the DOM elements
    root = document.createElement("div");
    root.setAttribute("id", "infos");
    document.body.appendChild(root);
  });

  afterEach(() => {
    // Clean up the DOM elements
    document.body.removeChild(root);
  });

  test("should display car information correctly", () => {
    const voiture = JSON.stringify({
      id: 1,
      marque: "Citroen",
      modele: "C3",
      finition: "Shine",
      carburant: { char: "E" },
      km: 50000,
      annee: 2018,
      prix: 15000,
    });

    afficherBlocVoiture(voiture);

    const contenuVoiture = document.getElementById("contenuVoiture");
    expect(contenuVoiture).not.toBeNull();

    const labels = contenuVoiture.querySelectorAll("label");
    const spans = contenuVoiture.querySelectorAll("span.infoVoiture");

    expect(labels.length).toBe(7);
    expect(spans.length).toBe(7);

    expect(labels[0].textContent).toBe("Marque : ");
    expect(spans[0].textContent).toBe("Citroen");

    expect(labels[1].textContent).toBe("Modèle : ");
    expect(spans[1].textContent).toBe("C3");

    expect(labels[2].textContent).toBe("Finition : ");
    expect(spans[2].textContent).toBe("Shine");

    expect(labels[3].textContent).toBe("Carburant : ");
    expect(spans[3].textContent).toBe("Essence");

    expect(labels[4].textContent).toBe("Kilométrage : ");
    expect(spans[4].textContent).toBe("50000");

    expect(labels[5].textContent).toBe("Année : ");
    expect(spans[5].textContent).toBe("2018");

    expect(labels[6].textContent).toBe("Prix : ");
    expect(spans[6].textContent).toBe("15000");

    const divSupprimer = document.getElementById("divSupprimer");
    expect(divSupprimer).not.toBeNull();

    const bouton = divSupprimer.querySelector("button");
    expect(bouton).not.toBeNull();
    expect(bouton.textContent).toBe("Supprimer");
    expect(bouton.getAttribute("onclick")).toBe("supprimerVoiture(1)");
  });

  test("should remove existing car information before displaying new one", () => {
    const voiture1 = JSON.stringify({
      id: 1,
      marque: "Citroen",
      modele: "C3",
      finition: "Shine",
      carburant: { char: "E" },
      km: 50000,
      annee: 2018,
      prix: 15000,
    });

    const voiture2 = JSON.stringify({
      id: 2,
      marque: "Peugeot",
      modele: "208",
      finition: "Allure",
      carburant: { char: "D" },
      km: 30000,
      annee: 2019,
      prix: 18000,
    });

    afficherBlocVoiture(voiture1);
    afficherBlocVoiture(voiture2);

    const contenuVoiture = document.getElementById("contenuVoiture");
    expect(contenuVoiture).not.toBeNull();

    const labels = contenuVoiture.querySelectorAll("label");
    const spans = contenuVoiture.querySelectorAll("span.infoVoiture");

    expect(labels.length).toBe(7);
    expect(spans.length).toBe(7);

    expect(labels[0].textContent).toBe("Marque : ");
    expect(spans[0].textContent).toBe("Peugeot");

    expect(labels[1].textContent).toBe("Modèle : ");
    expect(spans[1].textContent).toBe("208");

    expect(labels[2].textContent).toBe("Finition : ");
    expect(spans[2].textContent).toBe("Allure");

    expect(labels[3].textContent).toBe("Carburant : ");
    expect(spans[3].textContent).toBe("Diesel");

    expect(labels[4].textContent).toBe("Kilométrage : ");
    expect(spans[4].textContent).toBe("30000");

    expect(labels[5].textContent).toBe("Année : ");
    expect(spans[5].textContent).toBe("2019");

    expect(labels[6].textContent).toBe("Prix : ");
    expect(spans[6].textContent).toBe("18000");

    const divSupprimer = document.getElementById("divSupprimer");
    expect(divSupprimer).not.toBeNull();

    const bouton = divSupprimer.querySelector("button");
    expect(bouton).not.toBeNull();
    expect(bouton.textContent).toBe("Supprimer");
    expect(bouton.getAttribute("onclick")).toBe("supprimerVoiture(2)");
  });
});

describe("selectionnerPage", () => {
  let pagination;
  let pages;

  beforeEach(() => {
    // Set up the necessary DOM elements
    pagination = document.createElement("div");
    pagination.classList.add("pagination");

    const previous = document.createElement("a");
    previous.classList.add("previous");
    pagination.appendChild(previous);

    const pagesContainer = document.createElement("div");
    pagesContainer.setAttribute("id", "pages");
    pagination.appendChild(pagesContainer);

    pages = [];
    for (let i = 1; i <= 5; i++) {
      const page = document.createElement("a");
      page.setAttribute("value", i);
      page.textContent = `Page ${i}`;
      pagesContainer.appendChild(page);
      pages.push(page);
    }

    const next = document.createElement("a");
    next.classList.add("next");
    pagination.appendChild(next);

    document.body.appendChild(pagination);
  });

  afterEach(() => {
    // Clean up the DOM elements
    document.body.removeChild(pagination);
  });

  test("should select the first page and disable the previous button", () => {
    selectionnerPage(1, 10);

    expect(pages[0].classList.contains("active")).toBe(true);
    expect(
      document
        .querySelector("div.pagination a.previous")
        .classList.contains("disabled")
    ).toBe(true);
    expect(
      document.querySelector("div.pagination a.previous").hasAttribute("href")
    ).toBe(false);
  });

  test("should select a middle page and enable the previous and next buttons", () => {
    selectionnerPage(3, 10);

    expect(pages[2].classList.contains("active")).toBe(true);
    expect(
      document
        .querySelector("div.pagination a.previous")
        .classList.contains("disabled")
    ).toBe(false);
    expect(
      document.querySelector("div.pagination a.previous").getAttribute("href")
    ).toBe("#");
    expect(
      document
        .querySelector("div.pagination a.previous")
        .getAttribute("onclick")
    ).toBe("paginer(2)");

    expect(
      document
        .querySelector("div.pagination a.next")
        .classList.contains("disabled")
    ).toBe(false);
    expect(
      document.querySelector("div.pagination a.next").getAttribute("href")
    ).toBe("#");
    expect(
      document.querySelector("div.pagination a.next").getAttribute("onclick")
    ).toBe("paginer(4)");
  });

  test("should select the last page and disable the next button", () => {
    selectionnerPage(5, 10);

    expect(pages[4].classList.contains("active")).toBe(true);
    expect(
      document
        .querySelector("div.pagination a.next")
        .classList.contains("disabled")
    ).toBe(true);
    expect(
      document.querySelector("div.pagination a.next").hasAttribute("href")
    ).toBe(false);
  });
});
describe("afficherFormulaireCreation", () => {
  let nouvelle, fiche, recherche, pagination;

  beforeEach(() => {
    // Set up the necessary DOM elements
    nouvelle = document.createElement("div");
    nouvelle.setAttribute("id", "nouvelle");
    document.body.appendChild(nouvelle);

    fiche = document.createElement("div");
    fiche.setAttribute("id", "fiche");
    document.body.appendChild(fiche);

    recherche = document.createElement("div");
    recherche.setAttribute("id", "recherche");
    document.body.appendChild(recherche);

    pagination = document.createElement("div");
    pagination.classList.add("pagination");
    document.body.appendChild(pagination);
  });

  afterEach(() => {
    // Clean up the DOM elements
    document.body.removeChild(nouvelle);
    document.body.removeChild(fiche);
    document.body.removeChild(recherche);
    document.body.removeChild(pagination);
  });

  test("should display the creation form and hide other sections", () => {
    afficherFormulaireCreation();

    expect(nouvelle.style.display).toBe("block");
    expect(fiche.style.display).toBe("none");
    expect(recherche.style.display).toBe("none");
    expect(pagination.style.display).toBe("none");
  });
})
