import Link from 'next/link';

import { Button } from '../ui/button';

interface Props {
  title: string;
}

const DataUnavailable = ({ title }: Props) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <p className="text-center text-gray-500">{title}</p>
      <Button asChild variant="outline">
        <Link href="/">Go back to home page</Link>
      </Button>
    </div>
  );
};

export default DataUnavailable;
