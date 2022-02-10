import type { NextPage } from 'next'
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import VLink from '@atoms/link';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import { FiChevronRight } from 'react-icons/fi';
import { Flag } from '@assets/svg';

const Loading: NextPage = () => {
    const router = useRouter();

    return (
        <Layout>
            <main className="px-5">
                <StepperFrame>
                    <div className="px-[25px] mt-8">
                        <h1 className="text-[22px] font-[800] leading-9">Survey Complete!</h1>
                    </div>

                    {/* Flag wrapper */}
                    <div className='px-[25px] flex mt-[30px]'>
                        <div className='h-[160px] w-[300px] flex items-center justify-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]'>
                            <Flag />
                        </div>
                    </div>

                    <h3 className="text-[17.5px] mt-24 font-[800] leading-9 text-center">Thanks for your time!</h3>

                    {/* Continue Button */}
                    <div className='px-[25px] w-full mt-auto mb-6'>
                        <Button onClick={() => router.push('/loading')} className='relative font-semibold bg-primary text-white w-full rounded h-[45px]'>
                            Continue
                            <FiChevronRight className=' text-xl absolute top-1/2 right-7 transform -translate-y-1/2' />
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
