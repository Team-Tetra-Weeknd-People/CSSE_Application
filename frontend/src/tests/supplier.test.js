import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SupplierDashboard from "../pages/supplier/Dashboard";
import SupplierNotification from "../pages/supplier/Notifications";

//check whether the supplier dashboard is rendering
describe("Supplier Dashboard", () => {
  it("should be able to render the dashboard", () => {
    const { getByText } = render(<SupplierDashboard />);

    expect(getByText("Dashboard")).toBeTruthy();
  });
});

//check whether the supplier notification is rendering
describe("Supplier Notification", () => {
  it("should be able to render the notification", () => {
    const { getByText } = render(<SupplierNotification />);

    expect(getByText("Notificações")).toBeTruthy();
  });
});
