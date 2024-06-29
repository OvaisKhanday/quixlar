import Image from "next/image";
import notFoundIcon from "../../../public/404-page-not-found.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotFoundProps {}

export default function NotFound({}: NotFoundProps) {
  return (
    <div className='flex flex-col w-screen justify-center items-center mt-4 text-primary/60 px-5 max-w-3xl text-center mx-auto'>
      <Image src={notFoundIcon} alt='not found' className='h-32 my-10' />
      <h1 className='text-3xl font-bold text-primary/60 mb-4'>404: Quiz Not Found</h1>
      <p>The quiz you requested is not available or existent. Please rectify the URL and try again.</p>
      <Link href='/' className='mt-4'>
        <Button>Go back</Button>
      </Link>
    </div>
  );
}
