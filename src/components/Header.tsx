import Link from "next/link"
import Avatar from "./Avatar"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"

function Header() {
    return (
        <header className="bg-white shadow-sm text-gray-800 flex justify-between p-5">
            <Link href="/" className="flex items-center text-4xl font-thin">
                <Avatar seed="Classify AI App" />
                <div className="space-y-1 p-5">
                    <h1>Classify</h1>
                    <h2 className="text-sm"> Your Logistics AI Chat Agent</h2>
                </div>
            </Link>

            <div className="flex items-center">
                <SignedIn>
                    <UserButton showName />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </header>
    )
}
export default Header