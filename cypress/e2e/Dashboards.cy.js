describe("Dashboard render all components and dashboard", () => {
  beforeEach(() => {
    const endpoint =
      process.env.APP_ENV === "ci"
        ? "http://localhost:4173"
        : "http://127.0.0.1:5173/";
    cy.visit(endpoint);
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

describe("Dashboard filter feature", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
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
