import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (password !== "hello") {
      setDisplayError(true);
      return;
    }

    setDisplayError(false);
    const requestData = JSON.stringify({title, content});
    const headers = {"content-type": "application/json"};

    fetch('http://localhost:3000/blog/create-post', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: requestData
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
    console.log(requestData);

  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
      <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button>Post</button>
      {displayError && <p>Error. Incorrect password</p>}
      <br />
      <br />
      <Link to="/view">View</Link>
    </form>
  );
}
