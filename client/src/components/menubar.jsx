import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

export function MenubarDemo() {
    return (
        <div className="h-16 w-[780px]"> {/* Set height here */}
        <Menubar className="h-full w-full lg:flex hidden  justify-between">

            <MenubarMenu>
            <Link to="/">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Home Page
                </MenubarTrigger>
            </Link>
            </MenubarMenu>
            <MenubarMenu>
             <Link to="/upload">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Upload Papers
                </MenubarTrigger>
                
            </Link>
            </MenubarMenu>
            

            <MenubarMenu>
            <Link to="/viewpapers">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Download Papers
                </MenubarTrigger>
            </Link>
            </MenubarMenu>

            <MenubarMenu>
            <Link to="/user-schedule">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Subject Wise Notes
                </MenubarTrigger>
            </Link>
            </MenubarMenu>
            <MenubarMenu>
            <Link to="/res">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Other Resources
                </MenubarTrigger>
            </Link>
            </MenubarMenu>
            </Menubar>
        </div>
    );
}
