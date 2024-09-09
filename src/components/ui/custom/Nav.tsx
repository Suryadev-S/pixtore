import {
    SignInButton, SignedIn, SignedOut, UserButton, SignUpButton
} from '@clerk/nextjs'

import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { House, User, Pen, LogIn, UserCheck } from 'lucide-react';
import Link from "next/link";
import React from 'react';


const Nav = () => {
    return (
        <NavigationMenu className='bg-slate-800 py-1' >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='grid place-items-center'>
                                <House />
                                <small>home</small>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/create" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <div className='grid place-items-center'>
                                <Pen />
                                <small>create</small>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <SignedIn>
                    <NavigationMenuItem>
                        <Link href="/profile" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className='grid place-items-center'>
                                    <User />
                                    <small>Profile</small>
                                </div>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                        <UserButton />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </SignedIn>
                <SignedOut>
                    <NavigationMenuItem>
                        <SignInButton>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className='grid place-items-center'>
                                    <LogIn />
                                    <small>login</small>
                                </div>
                            </NavigationMenuLink>
                        </SignInButton>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <SignUpButton>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <div className='grid place-items-center'>
                                    <UserCheck />
                                    <small>SignUp</small>
                                </div>
                            </NavigationMenuLink>
                        </SignUpButton>
                    </NavigationMenuItem>
                </SignedOut>
            </NavigationMenuList>
        </NavigationMenu>

    )
}


export default Nav;