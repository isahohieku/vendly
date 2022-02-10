import type { NextPage } from 'next'
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import VLink from '@atoms/link';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import { FiChevronRight } from 'react-icons/fi';
import { Flag } from '@assets/svg';
import { useForm } from 'react-hook-form';
import { SearchForm } from 'src/types/forms';
import UserSearchForm from '@organisms/user-search-form';
import FormFrame from '@hoc/form';

const Loading: NextPage = () => {
    const router = useRouter();

    const { register } = useForm<SearchForm>()

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

                    <h3 className="text-[17.5px] mt-8 font-[800] leading-9 text-center">Pass it on?</h3>
                    <p className="text-center text-sm max-w-[260px] text-[#006E72] mx-auto font-normal">Nominate someone else to take this incentivized survey.</p>

                    {/* Search Input */}
                    <div className='px-[25px] mt-9'>
                        <div className="border-b-[2.5px] border-[#007575]">
                            <FormFrame className='w-full'>
                                <UserSearchForm register={register} />
                            </FormFrame>
                        </div>
                    </div>


                    {/* Continue Button */}
                    <div className='px-[25px] w-full mt-auto mb-6'>
                        <Button onClick={() => router.push('/loading')} className='relative font-semibold bg-[#C6F6F2] text-[#00D0BE] w-full rounded h-[45px] border-[1px] border-[#82ECD3]'>
                            Skip
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
