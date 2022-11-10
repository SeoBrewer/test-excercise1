import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [avgAge, setAvgAge] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const url = "https://randomuser.me/api/?results=20";

  const fetchUsersAndCalculateAvg = async () => {
    const response = await fetch(url).catch((err) => {
      setFetchError(true), console.log(err);
    });
    const json = await response.json();
    setUsers(json.results);
    const ages = await json.results.map((user) => user.dob.age);
    const sum = await ages.reduce((a, b) => a + b, 0);
    const avg = (await sum) / ages.length;
    setAvgAge(avg);
    console.log(
      json.results.map((user) => `${user.name.first} ${user.name.last}`)
    );
    console.log(`Users avgAge `, avg);
  };

  const loadingMessage = () => {
    if (fetchError) {
      return <p>Something went wrong while fetching users</p>;
    } else {
      return <p>Loading...</p>;
    }
  };

  useEffect(() => {
    fetchUsersAndCalculateAvg();
  }, []);

  return (
    <div className="App">
      {avgAge && users ? (
        <div>
          <h1>Avg users age {avgAge}</h1>
          {users.map((user) => (
            <Card
              key={user.login.uuid}
              style={{ margin: "20px", boxShadow: "1px 3px 1px grey" }}
            >
              <CardContent>
                <img src={user.picture.large} alt="user" />
                <Typography variant="h5" component="div">
                  <p>{`${user.name.first} ${user.name.last}`}</p>

                  <p>Age: {user.dob.age}</p>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <h1>{loadingMessage()}</h1>
      )}
    </div>
  );
}

export default App;
