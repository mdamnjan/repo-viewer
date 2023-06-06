import { Octokit } from "octokit";
import { useEffect, useState } from "react";

import "./App.css";
import RepoCard from "./components/RepoCard/RepoCard";

function App() {
  const octokit = new Octokit({
    // use access token from env for now
    auth: process.env.GH_ACCESS_TOKEN,
  });

  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);

  const getRepos = async () => {
    const repos = await octokit.request(`GET /users/${process.env.GH_USER}}/repos`);
    setRepos(repos.data);
    const user = await octokit.request(`GET /users/${process.env.GH_USER}`);
    setUser(user.data);
    return repos;
  };
  useEffect(() => {
    getRepos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <div className="user-profile">
            <img
              id="user-avatar"
              alt="User's avatar"
              src={user?.avatar_url}
            ></img>
            <h4>{user?.login}</h4>
            <h4>{user?.bio}</h4>
          </div>
          <div>
            <ul>
              <li>Overview</li>
              <li>Repositories</li>
            </ul>
            <div className="repo-list">
              {repos.map((repo) => (
                <RepoCard repo={repo} />
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;