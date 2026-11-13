import { describe, expect, it } from "vitest";
import { addressErrors, formSchemaAddress, formSchemaListing, listingErrors } from "@/lib/schema/schema.form.ts";

type ParseResult = Awaited<ReturnType<typeof formSchemaListing.parse>>;

const errorOf = (result: ParseResult, path: string): string | undefined => result.errors.find((e) => e.path === path)?.errors[0];

describe("formSchemaListing", () => {
  const valid = {
    date: "2026-11-12",
    description: null,
    price: 12.5,
    addressId: "3f2b8c1e-4d5a-4b6c-8e9f-0a1b2c3d4e5f",
    descriptionHelper: null,
  };

  it("accepts a valid listing", async () => {
    const result = await formSchemaListing.parse(valid);
    expect(result.errors).toEqual([]);
    expect(result.value).toEqual(valid);
  });

  describe("date", () => {
    it("rejects an empty date", async () => {
      expect(errorOf(await formSchemaListing.parse({ ...valid, date: "" }), "date")).toBe(listingErrors.date);
    });
  });

  describe("price", () => {
    it("rejects a missing price", async () => {
      expect(errorOf(await formSchemaListing.parse({ ...valid, price: undefined }), "price")).toBe(listingErrors.priceRequired);
    });

    it("rejects zero and negative prices", async () => {
      expect(errorOf(await formSchemaListing.parse({ ...valid, price: 0 }), "price")).toBe(listingErrors.pricePositive);
      expect(errorOf(await formSchemaListing.parse({ ...valid, price: -1 }), "price")).toBe(listingErrors.pricePositive);
    });

    it("accepts the minimum price of 0.01", async () => {
      expect(errorOf(await formSchemaListing.parse({ ...valid, price: 0.01 }), "price")).toBeUndefined();
    });
  });

  describe("addressId", () => {
    it("rejects an empty or invalid id", async () => {
      expect(errorOf(await formSchemaListing.parse({ ...valid, addressId: "" }), "addressId")).toBe(listingErrors.addressId);
      expect(errorOf(await formSchemaListing.parse({ ...valid, addressId: "abc" }), "addressId")).toBe(listingErrors.addressId);
    });

    it("rejects a UUID that is not version 4", async () => {
      const uuidV7 = "01890a5d-ac96-774b-bcce-b302099a8057";
      expect(errorOf(await formSchemaListing.parse({ ...valid, addressId: uuidV7 }), "addressId")).toBe(listingErrors.addressId);
    });
  });

  describe("description", () => {
    it("accepts null, undefined and text", async () => {
      expect((await formSchemaListing.parse({ ...valid, description: null })).errors).toEqual([]);
      expect((await formSchemaListing.parse({ ...valid, description: undefined })).errors).toEqual([]);
      expect((await formSchemaListing.parse({ ...valid, description: "Fahrt" })).errors).toEqual([]);
    });
  });
});

describe("formSchemaAddress", () => {
  const valid = { name: "Firma", street: "Hauptstraße 1", city: "Berlin" };

  it("accepts a valid address", async () => {
    const result = await formSchemaAddress.parse(valid);
    expect(result.errors).toEqual([]);
    expect(result.value).toEqual(valid);
  });

  it("collapses multiple spaces and trims all fields", async () => {
    const result = await formSchemaAddress.parse({ name: "  Firma   GmbH ", street: " Haupt   straße 1 ", city: "  Bad   Homburg  " });
    expect(result.value).toEqual({ name: "Firma GmbH", street: "Haupt straße 1", city: "Bad Homburg" });
  });

  it("rejects empty fields", async () => {
    const result = await formSchemaAddress.parse({ name: "", street: "", city: "" });
    expect(errorOf(result as any, "name")).toBe(addressErrors.name);
    expect(errorOf(result as any, "street")).toBe(addressErrors.street);
    expect(errorOf(result as any, "city")).toBe(addressErrors.city);
  });

  it("rejects fields that contain only whitespace", async () => {
    const result = await formSchemaAddress.parse({ name: "   ", street: "  ", city: " " });
    expect(errorOf(result as any, "name")).toBe(addressErrors.name);
    expect(errorOf(result as any, "street")).toBe(addressErrors.street);
    expect(errorOf(result as any, "city")).toBe(addressErrors.city);
  });
});
