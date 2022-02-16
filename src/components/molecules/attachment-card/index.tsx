import Button from '@atoms/button';
import Card from '@atoms/card';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

interface Props {
  image: string;
  className?: string;
  cardClassName?: string;
}

const AttachmentCard = ({ image, cardClassName }: Props) => {
  return (
    <Card
      className={
        'snap-start shrink-0 rounded-[10px] last:mr-[15px] overflow-hidden h-[130px] relative ' +
        (cardClassName || '')
      }
    >
      <Image width={124} height={130} className="" src={image} />
      <Button className="absolute top-2 text-[20px] font-[900] text-white right-2 opacity-50 rounded-full w-[28px] h-[28px] bg-black flex items-center justify-center text-md">
        <FiX />
      </Button>
    </Card>
  );
};

export default AttachmentCard;
