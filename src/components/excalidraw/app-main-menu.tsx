import { MainMenu } from "@excalidraw/excalidraw";
import React from "react";
import { LanguageList } from "./app-language/language-list";
import type { Theme } from "@excalidraw/excalidraw/element/types";
import Link from "next/link";
import { Bluesky, Github, Blog } from "@/components/icons";

interface AppMainMenuProps {
  theme: Theme | "system";
  setTheme: (theme: Theme | "system") => void;
  handleLangCodeChange: (langCode: string) => void;
}

function AppMainMenu(props: AppMainMenuProps) {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.SearchMenu />
      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />

      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme
        allowSystemTheme
        theme={props.theme}
        onSelect={props.setTheme}
      />
      <MainMenu.ItemCustom>
        <LanguageList handleLangCodeChange={props.handleLangCodeChange} />
      </MainMenu.ItemCustom>
      <MainMenu.DefaultItems.ChangeCanvasBackground />
      <MainMenu.Separator />
      <div className="flex flex-row gap-2">
        <Link
          href="https://github.com/EricTsai83/draw-stuff"
          target="_blank"
          rel="noopener"
          className="dropdown-menu-item dropdown-menu-item-base"
        >
          <div className="w-full flex justify-center">
            <Github />
          </div>
        </Link>
        <Link
          href="https://bsky.app/profile/ericts.com"
          target="_blank"
          rel="noopener"
          className="dropdown-menu-item dropdown-menu-item-base"
        >
          <div className="w-full flex justify-center">
            <Bluesky />
          </div>
        </Link>
        <Link
          href="https://ericts.com"
          target="_blank"
          rel="noopener"
          className="dropdown-menu-item dropdown-menu-item-base"
        >
          <div className="w-full flex justify-center">
            <Blog />
          </div>
        </Link>
      </div>
    </MainMenu>
  );
}

export default React.memo(AppMainMenu);
