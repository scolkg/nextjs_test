type ReadProps = {
  params: {
    id: string;
  };
};

export default async function Read(props: ReadProps) {
  const id = props.params.id;
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, { cache: "no-cache" });
  const topic = await resp.json();

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
