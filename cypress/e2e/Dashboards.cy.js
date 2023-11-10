describe("Dashboard render all components and dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Display loading state with skeleton UI", () => {
    const skeleton = cy.get("main .animate-pulse");
    skeleton.should("be.visible");
    skeleton.should("have.length.greaterThan", 4);
  });

  it("Contains filter dropdown", () => {
    const filter = cy.get("main header > button");
    filter.should("be.visible");
    filter.should("contain.text", "Filter items");
  });

  it("Renders all dashboard components", () => {
    const skeleton = cy.get("main .animate-pulse");
    skeleton.should("not.exist");
    // Dashboard titles
    const dashboardTitle = cy.get("main section h3");
    dashboardTitle.should("be.visible");
    dashboardTitle.should("have.length.greaterThan", 2);
    const dashboardStarIcon = cy.get("main section h3 button svg");
    dashboardStarIcon.should("be.visible");
  });
});

describe("Dashboard Filter Feature", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Filter dropdown is clickable", () => {
    const filter = cy.get("main header > button");
    filter.click();
    filter.should("have.attr", "aria-expanded", "true");
  });

  it("Apply filter", () => {
    const filter = cy.get("main header > button");
    filter.should("be.visible");
    filter.should("contain.text", "Filter items");

    // Get the total number of items before applying the filter
    cy.get("#dashboards-list ul li").then((items) => {
      const totalDashboardItems = items.length;

      // Click the filter button
      filter.click();

      // Change filter option to "Map"
      const filterOption = cy.get("#map-dashboards");
      filterOption.should("be.visible");
      filterOption.click();
      cy.get("main header > button").should("contain.text", "Map");

      // Number of items should be less than the total
      cy.get("#dashboards-list ul li").should(
        "have.length.lessThan",
        totalDashboardItems
      );
    });
  });
});

describe("Dashboard Favorite Items", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Toggle dashboard favorite status", () => {
    const getFavoriteToggle = cy.get(
      "#dashboards-list > div:first-of-type h3 .dashboard-favorite-toggle"
    );
    getFavoriteToggle.should("be.visible");
    getFavoriteToggle.click();
    // Favorite icon should be display fullfilled
    getFavoriteToggle.should("have.attr", "data-is-starred", "true");
    // And we should display a toast message
    cy.get("div > ol > li > div > div.text-sm.font-semibold")
      .should("be.visible")
      .should("contain.text", "Added to favorites");

    // Remove item from favorite
    getFavoriteToggle.click();
    // Favorite icon should be display empty
    getFavoriteToggle.should("have.attr", "data-is-starred", "false");
    // And we should display a toast message
    cy.get("div > ol > li > div > div.text-sm.font-semibold")
      .should("be.visible")
      .should("contain.text", "Removed from favorites");
  });
});
