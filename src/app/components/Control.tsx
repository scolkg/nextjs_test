"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>Update</Link>
          </li>
          <li>
            <button
              onClick={async () => {
                if (!window.confirm("정말 삭제할꺼임?")) {
                  return false;
                }
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, {
                  method: "DELETE",
                });
                const result = await resp.json();
                console.log(result);

                router.push("/");
                router.refresh();
              }}
            >
              Delete
            </button>
          </li>
        </>
      ) : null}
    </ul>
  );
}
