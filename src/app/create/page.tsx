"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
          title: { value: string };
          body: { value: string };
        };

        const title = target.title.value;
        const body = target.body.value;

        if (!title || !body) {
          alert("제목 또는 내용 입력");
          return false;
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        });

        const topic = await resp.json();
        console.log("file: page.js:22 - Create - topic: ", topic);
        router.push(`/read/${topic.id}`);
        router.refresh();
      }}
    >
      <h2>Create</h2>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
