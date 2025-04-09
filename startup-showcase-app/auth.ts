
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { author_info_query_by_id } from "./sanity/lib/queries"
import { clientWrite } from "./sanity/lib/client-write"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: {name, image}, profile}) {
      const id = profile?.id
      const author = await client
                           .withConfig({useCdn: false})
                           .fetch(author_info_query_by_id, {id})
      if(!author){
        await clientWrite
              .withConfig({useCdn: false})
              .create({
                _type: "author",
                username: name,
                id,
                avatar: image,
                bio: ""
              })
      }
      return true
    },
    async session({ session, token }) {
      Object.assign(session.user, {id: token.id})
      return session
    },
    async jwt({ token, account, profile }) {
      if(account && profile){
        token.accessToken = account.access_token
        token.id = profile?.id
      }
      return token
    }
  }
})