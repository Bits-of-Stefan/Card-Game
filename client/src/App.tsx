import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, []);

  async function greet() {
    // https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke('greet', { name })
    setGreetMsg('Hello ' + name + '!');
  }

  return (
    <div className="py-5 bg-background relative z-10 flex min-h-svh flex-col items-center container m-auto">
      <Header />
      <main className="py-5">
        <h1 className="text-red-500">Welcome to Card Game</h1>

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
    </div>
  );
}

export default App;
