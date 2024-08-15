import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';
import { v2 as cloudinary } from 'cloudinary';
import { createClerkClient } from '@clerk/backend';
import { auth } from '@clerk/nextjs/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const maxDuration = 20;

// NOTE: This is not in a working state as this application isn't
// configured for Clerk, this is just an example of how it can
// be set up for creating an authenticated Puppeteer session

export async function POST(request: Request) {
  const { userId } = auth();
  const expiresInSeconds = 60 * 5; // 5 minutes

  if ( !userId ) {
    return new Response(JSON.stringify({ error: 'Unauthenticated' }), {
      status: 401
    })
  }

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });

  const { token } = await clerkClient.signInTokens.createSignInToken({
    userId,
    expiresInSeconds,
  });

  const { siteUrl } = await request.json();

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;

  const browser = await puppeteer.launch({
    args: isLocal ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath('https://<Bucket Name>.s3.amazonaws.com/chromium-v126.0.0-pack.tar'),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  
  await page.goto(`${request.headers.get('origin')}/accept-token?token=${token}&redirect=${siteUrl}`);

  await page.waitForNetworkIdle()

  const pageTitle = await page.title();
  const pdf = await page.pdf();
  await browser.close();

  const resource = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, function (error: unknown, result: unknown) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    })
    .end(pdf);
  });

  return Response.json({
    siteUrl,
    pageTitle,
    resource
  })
}