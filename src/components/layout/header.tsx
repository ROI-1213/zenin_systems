import React from "react";
import { getPublicNavigationData } from "@/lib/db/queries";
import { HeaderClient } from "./header-client";

export async function Header() {
  const { coreCategories, aiCategories, services, settings } =
    await getPublicNavigationData();

  return (
    <HeaderClient
      coreCategories={coreCategories}
      aiCategories={aiCategories}
      services={services}
      settings={settings}
    />
  );
}
