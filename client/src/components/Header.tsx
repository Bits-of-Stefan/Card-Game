'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { PageRoute } from '@/types';
import { Music } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

function MusicDropdown() {
  const [musicVolume, setMusicVolume] = useState(50); // Default volume for Music
  const [sfxVolume, setSfxVolume] = useState(50); // Default volume for SFX
  console.log(musicVolume, sfxVolume);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="lg"
          className="rounded-2xl cursor-pointer"
          variant="outline">
          <Music />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <p>Sound settings</p>
            <Button
              className="cursor-pointer"
              variant="default"
              size="sm"
              onClick={() => {
                setMusicVolume(50);
                setSfxVolume(50);
              }}>
              Reset
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-4 py-2">
          <label className="block text-sm font-medium mb-2">Music Volume</label>
          <Slider
            value={[musicVolume]}
            onValueChange={(value) => setMusicVolume(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="px-4 py-2">
          <label className="block text-sm font-medium mb-2">SFX Volume</label>
          <Slider
            value={[sfxVolume]}
            onValueChange={(value) => setSfxVolume(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full justify-between flex">
        <Link to={PageRoute.LOGIN}>
          <Button variant="outline" className="cursor-pointer">
            LOGIN
          </Button>
        </Link>
        <MusicDropdown />
      </header>
    </>
  );
}
