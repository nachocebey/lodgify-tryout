describe("Main app spec", () => {
  beforeEach(() => {
    cy.visit("http://192.168.1.149:5173/");
  });

  it("Groups open on click", () => {
    cy.get('[data-testid="group-row-0"]').click();
    cy.get('[data-testid="group-tasks-list-0"]').should("exist");
  });

  it("Progress bar changes on task selection", () => {
    const apiUrl =
      "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress";
    cy.intercept("GET", apiUrl).as("apiFetch");
    cy.wait("@apiFetch").then(() => {
      let initialLoaderBarWidth;

      cy.get('[data-testid="loader-bar"]')
        .invoke("width")
        .then((width) => {
          initialLoaderBarWidth = width;
        });

      cy.get('[data-testid="group-row-0"]').should("exist");
      cy.get('[data-testid="group-row-0"]').click();

      cy.get("#taskCheckbox-0-0").should("exist");
      cy.get("#taskCheckbox-0-0").click();
      cy.get('[data-testid="loader-bar"]')
        .invoke("width")
        .should("not.eq", initialLoaderBarWidth);
    });
  });
});
