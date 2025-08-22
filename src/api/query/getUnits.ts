import { graphql } from "@/api/gql";

export const getUnits = graphql(`
  query Units {
    units {   
      id
      name
    }
  }
`);
