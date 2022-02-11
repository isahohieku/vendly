import type { NextPage } from 'next';
import { FaChevronRight } from 'react-icons/fa';
import { FiChevronRight, FiPlusCircle } from 'react-icons/fi';
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import Indicators from '@molecules/indicators';
import VLink from '@atoms/link';
import { useRouter } from 'next/router';
import Button from '@atoms/button';
import AttachmentCard from '@molecules/attachment-card';

const attachments = [
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=124&amp;h=130&amp;q=80',
  'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=124&amp;h=130&amp;q=80',
  'https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=124&amp;h=130&amp;q=80',
  'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=124&amp;h=130&amp;q=80',
  'https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=124&amp;h=130&amp;q=80',
];

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <main className="px-5">
        <StepperFrame>
          <div className="flex justify-end absolute right-4 top-2">
            <Indicators active={1} indicators={Array(4).fill({ active: false })} />
          </div>

          <div className="px-[25px] mt-8">
            <div className="flex justify-between items-center">
              <h1 className="text-[22px] font-[800] leading-9">Survey</h1>

              <VLink href="/">
                <span className="text-sm text-[#006E72] font-[600] flex items-center">
                  Skip <FaChevronRight />
                </span>
              </VLink>
            </div>
          </div>

          <div className="px-[25px] flex mt-[30px] text-[15.5px]">
            <p className="font-[800] text-[#006E72]">13.</p>
            <p className="font-[800] ml-2 leading-6">
              Add an attachment that reflects and portrays similar features and characteristics with
              the image shown below.{' '}
            </p>
          </div>

          {/* Attachments */}
          <div className="overflow-hidden mt-[50px] px-[25px]">
            <div className="w-full no-scrollbar flex gap-[15px] snap-x scroll-pl-[25px] overflow-x-auto">
              {attachments.map((link) => (
                <AttachmentCard image={link} key={link} cardClassName="border-2 border-[#82ECD3]" />
              ))}
            </div>
          </div>

          {/* Attachment Button */}
          <div className="flex items-center mt-[24px] px-[25px]">
            <Button>
              <FiPlusCircle className="text-[38px] text-[#82ECD3B2]" />
            </Button>

            <p className="capitalize ml-3 text-[#82ECD3B2] font-semibold">Add attachment</p>
          </div>

          {/* Finish Button */}
          <div className="px-[25px] w-full mt-auto mb-6">
            <Button
              onClick={() => router.push('/loading')}
              className="relative font-semibold bg-primary text-white w-full rounded h-[45px]"
            >
              Finish
              <FiChevronRight className=" text-xl absolute top-1/2 right-7 transform -translate-y-1/2" />
            </Button>
          </div>

          {/* Read Instruction */}
          <div className="flex justify-center font-normal items-center text-xs mb-5 text-[#006E72]">
            Read
            <VLink href="/" className="ml-1">
              <span className="text-sm text-[#17E7B3] flex items-center">Instructions</span>
            </VLink>
          </div>
        </StepperFrame>
      </main>
    </Layout>
  );
};

export default Home;
