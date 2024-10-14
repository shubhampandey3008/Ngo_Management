import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers , signIn , signOut , auth} = NextAuth({
    providers : [
        Credentials({
            credentials : {
                email : {label : "Email" , type: "email" , placeholder: "Email"},
                password : { label : "Password" , type : "password" , placeholder: "Password"}
            },
            async authorize(credentials){
                let user = null;

                user = {
                    email : "abc@gmail.com",
                    password : "password"
                }

                if(!user){
                    console.log("Invalid creds")
                    return null;
                }

                return user;
            }
        })
    ],
    callbacks: {
        authorized({request:{nextUrl} , auth}){
            const isLoggedIn = !!auth?.user;
            const {pathname} = nextUrl;
            if(pathname.startsWith('/api/auth/signin') && isLoggedIn){
                return Response.redirect(new URL('/' , nextUrl));
            }

            return true;
        }
    }
})