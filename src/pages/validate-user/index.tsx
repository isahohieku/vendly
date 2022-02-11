import type { NextPage } from 'next';
import type { Options } from 'react-lottie';
import Lottie from 'react-lottie';
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import Button from '@atoms/button';
import animationData from '@assets/lotties/verify-candidate.json';

const ValidateUser: NextPage = () => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Layout>
      <main className="px-5">
        <StepperFrame className="h-[484px] w-[308px] mx-auto mt-[84px]">
          {/* Loader wrapper */}
          <div className="flex items-center justify-center mt-[53px]">
            <Lottie options={defaultOptions} width={116} height={127} />
          </div>

          <p className="mt-[20px] leading-9 font-normal text-center text-[24px]">
            &#8358;<span className="font-[900]">2,000</span>.00
          </p>
          <p className="mt-[30px] leading-8 font-[600] text-center text-[17px]">Please Wait.</p>
          <p className="mt-[14px] leading-5 font-normal text-center text-[13px] text-[#006E72]">
            Validating user credentials....
          </p>

          {/* Button */}
          <div className="px-[25px] w-full mt-auto mb-12">
            <Button
              disabled
              className="relative font-semibold items-center space-x-2 justify-center flex bg-[#82ECD3] text-white w-full rounded h-[45px]"
            >
              <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
              <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
              <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
            </Button>
          </div>
        </StepperFrame>
      </main>
    </Layout>
  );
};

export default ValidateUser;
