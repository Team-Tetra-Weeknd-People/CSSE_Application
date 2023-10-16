import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SiteManagerDashboard from "../pages/siteManager/Dashboard";
import SiteManagerNotification from "../pages/siteManager/Notifications";

//check whether the site manager dashboard is rendered
describe("Site Manager Dashboard", () => {
  it("should be able to render the dashboard", () => {
    const { getByText } = render(<SiteManagerDashboard />);

    expect(getByText("Dashboard")).toBeTruthy();
  });
});

//check whether the site manager notification is rendered
describe("Site Manager Notification", () => {
  it("should be able to render the notification", () => {
    const { getByText } = render(<SiteManagerNotification />);

    expect(getByText("Notificações")).toBeTruthy();
  });
});
