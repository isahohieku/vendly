import type { NextPage } from 'next'
import { FaEllipsisH } from "react-icons/fa";
import Lottie, { Options } from 'react-lottie';
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import VLink from '@atoms/link';
import Button from '@atoms/button';
import animationData from '@assets/lotties/loading-complete-main.json';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sleep } from '@utils/functions';

const Loading: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        const completeLoading = async () => {
            await sleep(3)
            router.push('/survey-complete')
        }

        completeLoading();
    })

    const defaultOptions: Options = {
        loop: false,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Layout>
            <main className="px-5">
                <StepperFrame>
                    <div className="px-[25px] mt-8">
                        <h1 className="text-[22px] font-[800] leading-9">Survey...</h1>
                    </div>

                    {/* Loader wrapper */}
                    <div className='px-[25px] flex mt-[30px]'>
                        <div className='h-[300px] w-[300px] flex items-center justify-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]'>
                            <Lottie options={defaultOptions} width={150} height={150} />
                        </div>
                    </div>

                    {/* Button */}
                    <div className='px-[25px] w-full mt-auto mb-6'>
                        <Button disabled className='relative font-semibold items-center space-x-2 justify-center flex bg-[#82ECD3] text-white w-full rounded h-[45px]'>
                            <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
                            <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
                            <span className="inline-block rounded-full h-[8.8px] w-[8.8px] bg-primary"></span>
                        </Button>
                    </div>

                    {/* Read Instruction */}
                    <div className="flex justify-center font-normal items-center text-xs mb-5 text-[#006E72]">
                        Read
                        <VLink href="/" className='ml-1'>
                            <span className="text-sm text-[#17E7B3] flex items-center">Instructions</span>
                        </VLink>
                    </div>
                </StepperFrame>
            </main>
        </Layout>
    )
}

export default Loading
