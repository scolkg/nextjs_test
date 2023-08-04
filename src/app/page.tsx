import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      Hello, WEB!
      <p>
        <Image src="/hello.png" width={80} height={80} alt="next/image good!" />
      </p>
    </>
  );
}
