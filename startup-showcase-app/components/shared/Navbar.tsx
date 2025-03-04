
import { auth, signIn, signOut } from "@/auth"
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
                <div className="md:flex gap-5 text-black">
                {
                    session && session?.user ? 
                    <>
                        <span>{session?.user?.name}</span>
                        <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}
                            >
                            <button type="submit">Sign Out</button>
                        </form>
                    </>
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

