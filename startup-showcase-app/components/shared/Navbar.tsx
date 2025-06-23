
import { auth, signIn, signOut } from "@/auth"
import { LogOut, PlusCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {
    const session = await auth()
    return(
        <header className="mx-5 mt-2">
            <nav className="flex-between">
                <Link href="/">
                    <Image src="/Roselia_logo.jpg" height={80} width={183} alt="Rose-logo" />
                </Link>
                <div className="flex gap-5 text-black items-center">
                    {
                        session?.user && <Link href="/startupCreate" className="max-sm:hidden">Create</Link>
                    }
                    {
                        session?.user && <Link href="/startupCreate" className="sm:hidden"><PlusCircle /></Link>
                    }
                {
                    session && session?.user ? 
                    <div className="flex gap-5 items-center">
                        <span className="max-sm:hidden">{session?.user?.name}</span>
                        <Image 
                            src={session?.user?.image || ""}
                            width={50}
                            height={50}
                            alt="avatar"
                            className="sm:hidden"
                            />
                        <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}
                            >
                            <button type="submit" className="max-sm:hidden">Sign Out</button>
                            <button type="submit" className="sm:hidden"><LogOut /></button>
                        </form>
                    </div>
                    : 
                    <form action={async () => {
                        "use server"
                        await signIn("github")
                    }}>
                        <button type="submit">Sign in</button>
                    </form>
                }
                </div>
            </nav>
        </header>
    )
}

export default Navbar

