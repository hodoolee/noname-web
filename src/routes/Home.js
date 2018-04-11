import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_USERS = gql`
  {
    allUsers {
      id
      username
    }
  }
`;

const Home = () => (
  <Query
    query={GET_USERS}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      
      return (
        <div>
          {data.allUsers.map(({ id, username }) => (
            <div key={id}>
              <p>{username}</p>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Home;