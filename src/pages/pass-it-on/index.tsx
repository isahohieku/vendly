import type { NextPage } from 'next'
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import VLink from '@atoms/link';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import { FiChevronRight, FiTwitter } from 'react-icons/fi';
import { Flag, VendlyV } from '@assets/svg';
import { useForm } from 'react-hook-form';
import { SearchForm } from 'src/types/forms';
import UserSearchForm from '@organisms/user-search-form';
import FormFrame from '@hoc/form';
import VerticalScrollFrame from '@hoc/vertical-scroll-frame';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTwitter } from 'react-icons/fa';
import { useGetUsers } from '@services/users';
import { GetNextPageParamFunction } from 'react-query';
import { IUser, IUserResponse } from 'src/types/users';
import _ from 'lodash';
import Lottie, { Options } from 'react-lottie';
import UserCard from '@molecules/user-card';
import loadingData from '@assets/lotties/loading-fill.json';
import searchData from '@assets/lotties/search-not-found.json';


const Loading: NextPage = () => {
    const totalPages = 2;
    const router = useRouter();
    const [showSearchResult, setShowSearchResult] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const { register, watch, setValue } = useForm<SearchForm>({ defaultValues: { search: ''}});

    const search = watch('search');

    const getNextPageParam: GetNextPageParamFunction<IUserResponse> = (lastPage: IUserResponse) =>
        (lastPage.info.page < totalPages) && totalPages;

    const {
        data: users,
        refetch,
        isLoading,
        isError,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useGetUsers({
        enabled: false,
        getNextPageParam,
    });

    // const searchUser = useCallback(_.debounce(refetch, 500), []);

    useEffect(() => {
        if (search?.length > 1 && !selectedUser) {
            setShowSearchResult(true)
            refetch()
        }
    }, [search])

    const loadingOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const notFoundOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: searchData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
                    <div className='relative px-[25px] mt-9'>
                        {showSearchResult && <div className='absolute -left-2 bottom-9'>
                            {/* Search Result */}
                            {/* {!(isLoading || isFetching) && users?.pages.length && (users?.pages.map(({ results }) => results.filter(user => user?.name?.first.includes(search) || user?.name?.last.includes(search) || user?.username?.includes(search))).flat().length > 0) && <VerticalScrollFrame className='h-[438px] w-[286px] rounded-[8px] border border-[#82ECD3] bg-white overflow-hidden flex flex-col'> */}
                            {<VerticalScrollFrame className='h-[438px] w-[286px] rounded-[8px] border border-[#82ECD3] bg-white overflow-hidden flex flex-col'>
                                <Button disabled={!hasNextPage} className="w-full h-[40px] flex justify-center items-center text-[#00D0BE] bg-white" >
                                    <FaChevronUp />
                                </Button>
                                <div className='gap-[18px] h-[calc(100%-80px)] snap-y scroll-pt-[30px] pl-[30px] overflow-y-auto scrollbar-thin scrollbar-thumb-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                                    {users && users?.pages.map(({ results }) => results.filter(user => user?.name?.first.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user?.name?.last.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user?.username?.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(user => <UserCard key={user.email} user={user} selectedUser={(selected) => { console.log('selected', selected); setValue('search', `@${selected?.name?.last.toLowerCase()}`); setSelectedUser(selected);  setShowSearchResult(false); }}  />))}
                                </div>

                                <Button className="w-full h-[40px] flex justify-center items-center text-[#00D0BE] bg-white">
                                    <FaChevronDown />
                                </Button>
                            </VerticalScrollFrame>}

                            {/* Loading */}
                            {(isLoading || isFetching) && <div className="h-[441px] w-[268px] rounded-[8px] flex flex-col justify-center items-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]">
                                <div className="w-[200px] h-[210px] bg-white flex justify-center items-center">
                                    <Lottie options={loadingOptions} width={180} height={180} />
                                </div>
                                <p className='text-[#006E72] font-semibold leading-[18px] text-[10.8px] mt-2 text-center'>Fetching Search Results</p>
                            </div>}

                            {/* Not found */}
                            {!(isLoading || isFetching) && users?.pages.length && (users?.pages.map(({ results }) => results.filter(user => user?.name?.first.includes(search) || user?.name?.last.includes(search) || user?.username?.includes(search))).flat().length === 0) && <div className="h-[441px] w-[268px] rounded-[8px] flex flex-col justify-center items-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]">
                                <div className="w-[200px] h-[210px] bg-white flex justify-center items-center">
                                    <Lottie options={notFoundOptions} width={180} height={180} />
                                </div>
                                <p className='text-[#006E72] font-semibold leading-[18px] text-[10.8px] mt-2 text-center'>No results found</p>
                            </div>}
                        </div>}
                        <div className="border-b-[2.5px] border-[#007575] flex items-end ">
                            <FormFrame className='w-full'>
                                <UserSearchForm register={register} value={search} showSearchResult={setShowSearchResult} />
                            </FormFrame>

                            <p className='text-[#C6F6F4] font-[900] text-lg'>OK</p>
                            {/* <Lottie options={loadingOptions} width={30} height={30} /> */}
                            {selectedUser && <>
                                <Button className='mr-2'>
                                    <FaTwitter className='text-[#03A9F4]' />
                                </Button>
                                {selectedUser.isVendly && <Button className='pb-[2px]'>
                                    <VendlyV />
                                </Button>}
                            </>}
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
