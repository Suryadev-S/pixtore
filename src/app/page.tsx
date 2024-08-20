'use client'

import { useQueryPost } from "@/lib/queriesAndMutations/queries";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton"
import { Post } from "@/lib/types";
import { Key } from "react";


export default function Home() {
  const { isLoaded, userId } = useAuth();
  const query = useQueryPost();
  if (!isLoaded || !userId) {
    return (
      <div>
        user data not loaded yet or no userId
      </div>
    )
  }

  if (query.isLoading) {
    return (
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    )
  }

  return (
    <main>
      {query.data.length == 0 &&
        (
          <div>No posts as of now</div>
        )
      }
      {query.data.length > 0 &&
        (
          query.data.map((post: Post, i: Key) => (
            <div key={i}>post{i}</div>
          ))
        )
      }
    </main>
  );
}
