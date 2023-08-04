"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UpdateProps = {
  params: {
    id: string;
  };
};

type EventTargetType = {
  title: { value: string };
  body: { value: string };
};

export default function Update(props: UpdateProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const id = props.params.id;

  async function refresh() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`);
    const topic = await resp.json();
    setTitle(topic.title);
    setBody(topic.body);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const target = event.target as typeof event.target & EventTargetType;
          const title = target.title.value;
          const body = target.body.value;

          const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, body }),
          });
          const topic = await resp.json();
          router.push(`/read/${topic.id}`);
          router.refresh();
        }}
      >
        <h2>Update</h2>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </p>
        <p>
          <textarea name="body" placeholder="body" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </>
  );
}
