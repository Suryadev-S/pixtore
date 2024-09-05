'use client'

import { useQueryPost } from "@/lib/queriesAndMutations/queries";
import { useAuth } from "@clerk/nextjs";
import { Post } from "@/lib/types";
import { Key, useEffect } from "react";
import { useRouter } from "next/navigation";
import PreviewCard from "@/components/ui/custom/PreviewCard";
import Loader from "@/components/ui/custom/Loader";


export default function Home() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const query = useQueryPost();

  useEffect(() => {
    if (!isLoaded || !userId) {
      router.push("/testPage");
    }
  }, [])

  if (query.isLoading) {
    return (
      <Loader fillCount={3} className="w-[350px] mx-auto grid gap-4"/>
    )
  }

  return (
    <main className="wrapper">
      {query.data.length == 0 &&
        (
          <div>No posts as of now</div>
        )
      }
      {query.data.length > 0 &&
        <ul className="preview-list">
          {
            query.data.map((post: Post, i: Key) => (
              <li key={i}>
                <PreviewCard post={post} />
              </li>
            ))
          }
        </ul>
      }
    </main>
  );
}
