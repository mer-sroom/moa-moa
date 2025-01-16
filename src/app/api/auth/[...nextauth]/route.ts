import NextAuth from "next-auth/index";
import { authOptions } from "../authoptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };