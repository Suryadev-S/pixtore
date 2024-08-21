import {
    SignInButton, SignedIn, SignedOut, UserButton
} from '@clerk/nextjs'

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { House } from 'lucide-react';
import { Pen } from 'lucide-react';
import { LogIn } from 'lucide-react';
import Link from "next/link";


const Nav = () => {
    return (
        <NavigationMenu className='bg-slate-800 py-1'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <House />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/testPage" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            test page
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/create" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <Pen />
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <SignedOut>
                        <SignInButton>
                            <LogIn />
                        </SignInButton>
                    </SignedOut>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
}

export default Nav;