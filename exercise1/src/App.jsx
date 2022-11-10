import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [avgAge, setAvgAge] = useState(null);

  const url = "https://randomuser.me/api/?results=20";

  async function handleFetch() {
    fetch(url, {
      method: "GET",
    }).then((response) => {
      response.json().then((data) => {
        setUsers(data.results);
      });
    });
  }

  async function nameLastName() {
    const newUsers = users.map(
      (user) => `${user.name.first} ${user.name.last}`
    );
    const ageUsers = users.map((user) => user.dob.age);

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

    const result = average(ageUsers); // 5
    setAvgAge(result);
    // console.log(result);

    return { firstLast: newUsers, age: ageUsers, average: result };
  }

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    nameLastName();
    console.log("🚀 ~ file: App.jsx ~ line 8 ~ App ~ newUsers", nameLastName());
  }, [users]);

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

                  <p>{user.dob.age}</p>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <h1>Calculating Avg age and Random Users...</h1>
      )}
    </div>
  );
}

export default App;
