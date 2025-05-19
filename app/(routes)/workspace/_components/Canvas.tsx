'use client';

import { api } from '@/convex/_generated/api';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { t } from '@excalidraw/excalidraw/i18n';
import '@excalidraw/excalidraw/index.css';
import { useMutation } from 'convex/react';
import { Github, Menu } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { toast } from 'sonner';


export default function Canvas({onSaveTrigger, onSaveHandled, fileData, fileId}: any) {

    const [canvas, setCanvas] = useState<any>('');
    useEffect(() => {
        onSaveTrigger && saveCanvas()&& onSaveHandled();
        
    })
    const saveCanvas = () => {
     updateCanvas({_id:fileId, canvas: JSON.stringify(canvas)}).then(()=>{toast.success("Saved Successfully")},(e)=>{toast.error("An error occured")
        console.log(e);
        
     }).catch((e)=>{toast.error("Something went wrong")}) 
    }

    const updateCanvas= useMutation(api.files.updateCanvas)
  return (
    <div className="w-full h-full">
      <Excalidraw 
      onChange={(excalidrawElements, appState, files) =>
        {
          setCanvas(excalidrawElements);
        }
      }
    initialData={{
          elements: fileData ?  JSON.parse(fileData.canvas) : [],
          appState: { zenModeEnabled: false, viewBackgroundColor: "#E5F4FF" },
          scrollToContent: true
        }}
        
        UIOptions={
          {
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false
            }
          }
        }
>

    <MainMenu >
        <MainMenu.DefaultItems.ClearCanvas />
        <MainMenu.DefaultItems.Help/>
        <MainMenu.DefaultItems.SaveAsImage/>
        <MainMenu.DefaultItems.SearchMenu/>
        <MainMenu.Item onClick={() => window.open('https://github.com/Ansh-Mishra04/draw-tools')}>Github</MainMenu.Item>
    </MainMenu>

    <WelcomeScreen>
        <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo >
            <img src="https://i.ibb.co/vCmPKKGF/logo1.png" alt="logo" width={120}/>
            </WelcomeScreen.Center.Logo>
         <WelcomeScreen.Center.Heading>
              Welcome to Think Board!
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw" icon={<Github width={16}/>} shortcut={"⌘G"}>
                     Excalidraw GitHub 
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
        </WelcomeScreen.Center>
         <WelcomeScreen.Hints.ToolbarHint>
            <p> ToolBar Hints </p>
          </WelcomeScreen.Hints.ToolbarHint>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
</Excalidraw>
    </div>
  );
}
