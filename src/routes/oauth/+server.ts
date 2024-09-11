import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

interface UserData {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email?: string;
}

async function getUserData(access_token: string): Promise<UserData> {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  const data: UserData = await response.json();
  console.log('User data:', data);
  return data;
}

export const GET = async ({ url }: { url: URL }) => {
  const redirectURL = 'http://localhost:5173/oauth';
  const code = url.searchParams.get('code');
  console.log('Returned code:', code);

  try {
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      redirectURL
    );

    // Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code || '');
    oAuth2Client.setCredentials(tokens);

    // Get user data using the access token
    const userData = await getUserData(tokens.access_token as string);

    // Redirect to a client-side route with the user data in the query string

  } catch (err) {
    console.error('Error logging in with OAuth2 user', err);
  }

  throw redirect(302, '/');
};
