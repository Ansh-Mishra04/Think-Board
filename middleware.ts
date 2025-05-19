import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req: any) {
  if (req.url === '/' || req.nextUrl.pathname === '/') {
    return ;
  }

  // Apply the authorization middleware to all other routes
  return withAuth(req);
}

export const config = {
  matcher: [
   '/dashboard','/teams/create' 
  ]
};
