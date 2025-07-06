import reactLogo from '@/assets/react.svg';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke('greet', { name })
    setGreetMsg('Hello ' + name + '!');
  }

  return (
    <main className="container1">
      <h1>Welcome to Card Game</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}>
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <Button type="submit">Greet</Button>
      </form>
      <p>{greetMsg}</p>

      <br />
      <Outlet />
    </main>
  );
}

export default App;
