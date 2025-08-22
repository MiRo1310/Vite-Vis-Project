import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5095/graphql",
  documents: ["src/api/**/*.ts", "src/**/*.vue"],
  generates: {
    "./src/api/gql/": {
      preset: "client",
      config: {
        scalars: {
          UUID: "string",
          Decimal: "number",
          Float: "number",
          DateTime: "string",
          Date: "string",
          Time: "string",
          Boolean: "boolean",
          String: "string",
          Int: "number",
        },
      },
    },
  },
};

export default config;
