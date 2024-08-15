"use client";
import { useUser, useSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AcceptToken() {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const { user } = useUser();
  const [signInProcessed, setSignInProcessed] = useState<boolean>(false);
  const signInToken = useSearchParams().get("token");
  const redirectTo = useSearchParams().get("redirect");

  useEffect(() => {
    if ( !signInProcessed || !user ) return;

    if ( redirectTo ) {
      router.push(redirectTo);
    }
  }, [signInProcessed, user, redirectTo])

  useEffect(() => {
    if (!signIn || !setActive || !signInToken) {
      return;
    }

    const createSignIn = async () => {
      try {
        // Create a signIn with the token.
        // Note that you need to use the "ticket" strategy.
        const res = await signIn.create({
          strategy: "ticket",
          ticket: signInToken as string,
        });
        setActive({
          session: res.createdSessionId,
          beforeEmit: () => setSignInProcessed(true),
        });
      } catch (err) {
        setSignInProcessed(true);
      }
    };

    createSignIn();
  }, [signIn, setActive]);

  if (!signInToken) {
    return <div>no token provided</div>;
  }

  if (!signInProcessed) {
    return <div>loading</div>;
  }

  if (!user) {
    return <div>error invalid token</div>;
  }

  return <div>Signed in as {user.id}</div>;
}