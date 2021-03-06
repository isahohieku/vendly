import type { NextPage } from 'next';
import Layout from '@templates/layout';
import StepperFrame from '@hoc/stepper-frame';
import VLink from '@atoms/link';
import Button from '@atoms/button';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { Flag, VendlyV } from '@assets/svg';
import { useForm } from 'react-hook-form';
import type { SearchForm } from 'src/types/forms';
import UserSearchForm from '@organisms/user-search-form';
import FormFrame from '@hoc/form';
import VerticalScrollFrame from '@hoc/vertical-scroll-frame';
import React, { useEffect, useRef, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { useGetUsers } from '@services/users';
import type { GetNextPageParamFunction } from 'react-query';
import type { IUser, IUserResponse } from 'src/types/users';
import type { Options } from 'react-lottie';
import Lottie from 'react-lottie';
import UserCard from '@molecules/user-card';
import loadingData from '@assets/lotties/loading-fill.json';
import loadingCompletedData from '@assets/lotties/loading-complete.json';
import searchData from '@assets/lotties/search-not-found.json';
import { filterUsers, sleep } from '@utils/functions';
import { useScroll } from 'src/hooks/scroll';
import ClickOutside from '@hoc/click-outside';
import UserCardModal from '@molecules/user-card-modal';
import Chevron from '@assets/svg/chevron';

const Loading: NextPage = () => {
    const totalPages = 2;
    const router = useRouter();

    const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
    const [completingPassingToUser, setCompletingPassingToUser] = useState<boolean>(false);
    const [completedPassingToUser, setCompletedPassingToUser] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [touchedField, setTouchedField] = useState<boolean>(false);
    const [verifyingSelected, setVerifyingSelected] = useState<boolean>(false);
    const [verifyingSelectedComplete, setVerifyingSelectedComplete] = useState<boolean>(false);

    const { register, watch, setValue, reset } = useForm<SearchForm>({ defaultValues: { search: '' } });

    const scrollWrapper = useRef<HTMLDivElement>(null);

    const [atStart, atEnd, scrollUp, scrollDown, onScroll] = useScroll(scrollWrapper);

    const search = watch('search');

    const getNextPageParam: GetNextPageParamFunction<IUserResponse> = (lastPage: IUserResponse) =>
        lastPage.info.page < totalPages && totalPages;

    const {
        data: users,
        refetch,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useGetUsers({
        queryKey: ['users', search],
        enabled: true,
        staleTime: 10 * 60 * 1000,
        getNextPageParam,
    });

    const completeSurvey = async () => {
        setCompletingPassingToUser(true);
        await sleep(4);
        setCompletingPassingToUser(false);
        setCompletedPassingToUser(true)
        await sleep(3);
        router.push('/validate-user');
    };

    useEffect(() => {
        if (search?.length > 1 && !selectedUser) {
            setShowSearchResult(true);
            refetch();
        }

        if (search) {
            setTouchedField(true);
        }
    }, [search]);

    useEffect(() => {
        if (atEnd && hasNextPage) {
            fetchNextPage().then(() => scrollDown())
        }
    }, [atEnd]);

    const verifySelectedUser = async () => {
        setVerifyingSelected(true);
        await sleep(3);
        setVerifyingSelected(false);
        setVerifyingSelectedComplete(true);
        await sleep(3);
        setVerifyingSelectedComplete(false)
    }

    const loadingOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const loadingCompletedOptions: Options = {
        loop: 1,
        autoplay: true,
        animationData: loadingCompletedData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const notFoundOptions: Options = {
        loop: true,
        autoplay: true,
        animationData: searchData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Layout>
            <main className="px-5">
                <StepperFrame>
                    <div className="px-[25px] mt-8">
                        <h1 className="text-[22px] font-[800] leading-[36.65px]">Survey Complete!</h1>
                    </div>

                    {/* Flag wrapper */}
                    <div className="px-[25px] flex mt-[30px]">
                        <div className="h-[160px] w-[300px] flex items-center justify-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]">
                            <Flag />
                        </div>
                    </div>

                    <h3 className="text-[17.5px] mt-8 font-[800] text-[#003333] leading-9 text-center">Pass it on?</h3>
                    <p className="text-center text-sm max-w-[260px] text-[#006E72] leading-[22.46px] mx-auto font-normal">
                        Nominate someone else to take this incentivized survey.
                    </p>

                    {/* Search Input */}
                    <div className="relative w-[274px] mx-auto mt-9">
                        <div
                            className={
                                'absolute -left-2 bottom-9 ' + (showSearchResult ? 'opacity-100' : 'opacity-0')
                            }
                        >
                            {/* Search Result */}
                            {users?.pages.length && users?.pages.map(({ results }) => filterUsers(results, search)).flat().length > 0 &&
                                users?.pages
                                    .map(({ results }) => results)
                                    .flat().length > 0 && (
                                    <VerticalScrollFrame className="rounded-[8px] border border-[#82ECD3] bg-white overflow-hidden h-[438px] w-[286px]">
                                        <ClickOutside onClickOutside={() => setShowSearchResult(false)}>
                                            <div className="flex flex-col">
                                                <Button
                                                    onClick={() => scrollUp()}
                                                    disabled={atStart}
                                                    className="w-full h-[40px] flex justify-center items-center text-[#00D0BE] bg-white disabled:opacity-50"
                                                >
                                                    {!(isLoading || isFetching) ? <Chevron /> : <Lottie options={loadingOptions} width={30} height={30} />}
                                                </Button>
                                                <div
                                                    className="gap-[18px] h-[calc(436px-80px)] snap-y scroll-pt-[30px] pl-[30px] overflow-y-auto scrollbar-thin scrollbar-thumb-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-results"
                                                    onScroll={onScroll}
                                                    ref={scrollWrapper}

                                                >
                                                    {users.pages.length &&
                                                        users?.pages
                                                            .map(({ results }) => results)
                                                            .flat()
                                                            .filter(
                                                                (user) =>
                                                                    user?.name?.first.toLowerCase().includes(search.toLowerCase()) ||
                                                                    user?.name?.last.toLowerCase().includes(search.toLowerCase()) ||
                                                                    user?.username?.toLowerCase().includes(search.toLowerCase()) ||
                                                                    user?.username
                                                                        ?.toLowerCase()
                                                                        .includes(search.substring(1).toLowerCase()) ||
                                                                    user?.name.last
                                                                        ?.toLowerCase()
                                                                        .includes(search.substring(1).toLowerCase()) ||
                                                                    `${user?.name?.first} ${user?.name?.last}`
                                                                        .toLowerCase()
                                                                        .includes(search.toLowerCase()),
                                                            )
                                                            .map((user) => (
                                                                <UserCard
                                                                    key={user.email}
                                                                    user={user}
                                                                    selectedUser={(selected) => {
                                                                        setSelectedUser(selected);
                                                                        verifySelectedUser();
                                                                        setValue(
                                                                            'search',
                                                                            `@${selected?.username || selected?.name?.last.toLowerCase()
                                                                            }`,
                                                                        );
                                                                        setShowSearchResult(false);
                                                                    }}
                                                                />
                                                            ))}
                                                </div>

                                                <Button
                                                    onClick={() => scrollDown()}
                                                    disabled={atEnd}
                                                    className="w-full h-[40px] flex justify-center items-center text-[#00D0BE] bg-white disabled:opacity-50"
                                                >
                                                    {!(isLoading || isFetching) ? <div className="rotate-180">
                                                        <Chevron />
                                                    </div> : <span className='text-[7px] text-black font-normal'>Fetching Search Results...</span>}
                                                </Button>
                                            </div>
                                        </ClickOutside>
                                    </VerticalScrollFrame>
                                )}

                            {/* Loading */}
                            {(isLoading || isFetching) && !(users?.pages.map(page => page.results).flat()?.length) && (
                                <div className="h-[441px] w-[268px] rounded-[8px] flex flex-col justify-center items-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]">
                                    <div className="w-[200px] h-[210px] bg-white flex justify-center items-center">
                                        <Lottie options={loadingOptions} width={180} height={180} />
                                    </div>
                                    <p className="text-[#006E72] font-semibold leading-[18px] text-[10.8px] mt-2 text-center">
                                        Fetching Search Results
                                    </p>
                                </div>
                            )}

                            {/* Not found */}
                            {!(isLoading || isFetching) && showSearchResult &&
                                users?.pages
                                    .map(({ results }) => results)
                                    .flat()
                                    .filter(
                                        (user) =>
                                            user?.name?.first.toLowerCase().includes(search.toLowerCase()) ||
                                            user?.name?.last.toLowerCase().includes(search.toLowerCase()) ||
                                            user?.username?.toLowerCase().includes(search.toLowerCase()) ||
                                            user?.username?.toLowerCase().includes(search.substring(1).toLowerCase()) ||
                                            user?.name.last?.toLowerCase().includes(search.substring(1).toLowerCase()) ||
                                            `${user?.name?.first} ${user?.name?.last}`
                                                .toLowerCase()
                                                .includes(search.toLowerCase()),
                                    ).length === 0 && (
                                    <ClickOutside onClickOutside={() => setShowSearchResult(false)}>
                                        <div className="h-[441px] w-[268px] rounded-[8px] flex flex-col justify-center items-center bg-[#E0FAF8] border-[0.8px] border-[#82ECD3]">
                                            <div className="w-[200px] h-[210px] bg-white flex justify-center items-center">
                                                <Lottie options={notFoundOptions} width={180} height={180} />
                                            </div>
                                            <p className="text-[#006E72] font-semibold leading-[18px] text-[10.8px] mt-2 text-center">
                                                No results found
                                            </p>
                                        </div>
                                    </ClickOutside>
                                )}
                        </div>
                        <div className="border-b-[2.5px] border-[#007575] flex items-center ">
                            <FormFrame className="w-full">
                                <UserSearchForm
                                    register={register}
                                    value={search}
                                    // showSearchResult={setShowSearchResult}
                                    resetUser={() => setSelectedUser(null)}
                                />
                            </FormFrame>

                            {/* <p className='text-[#C6F6F4] font-[900] text-lg'>OK</p> */}
                            {selectedUser && verifyingSelected && (
                                <Lottie options={loadingOptions} width={22} height={22} />
                            )}
                            {selectedUser && verifyingSelectedComplete && (
                                <Lottie options={loadingCompletedOptions} width={22} height={22} />
                            )}
                            {!showSearchResult && !verifyingSelected && !verifyingSelectedComplete && (
                                <>
                                    {selectedUser && (
                                        <Button className="mr-2">
                                            <FaTwitter className="text-[#03A9F4]" />
                                        </Button>
                                    )}
                                    {selectedUser?.isVendly && (
                                        <Button className="pb-[1px]" onClick={() => setIsOpenModal(true)}>
                                            <VendlyV />
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="px-[18px] w-full mt-auto mb-6 h-[45px]">
                        <Button
                            onClick={() => {
                                if (!selectedUser) return;
                                completeSurvey();
                            }}
                            className={
                                'relative font-semibold bg-[#C6F6F2] text-[#00D0BE] w-full rounded h-[45px] border-[1px] border-[#82ECD3] ' +
                                ((selectedUser && !verifyingSelected && !verifyingSelectedComplete) ? 'bg-[#006E72] text-[#FFFFFF] border-0' : '') + (touchedField ? ' text-[#FFFFFF]' : '')
                            }
                        >
                            {!completingPassingToUser && !completedPassingToUser ? (
                                <>
                                    {selectedUser && !verifyingSelected && !verifyingSelectedComplete ? 'Continue' : 'Skip'}
                                    <FiChevronRight className=" text-xl absolute top-1/2 right-7 transform -translate-y-1/2" />
                                </>
                            ) : (<>
                                {completingPassingToUser && <Lottie options={loadingOptions} width={40} height={40} />}
                                {completedPassingToUser && <Lottie options={loadingCompletedOptions} width={40} height={40} />}
                            </>
                            )}
                        </Button>
                    </div>

                    {/* Read Instruction */}
                    {!touchedField ? <div className="flex justify-center font-normal items-center text-xs mb-5 text-[#006E72]">
                        Read
                        <VLink href="/" className="ml-1">
                            <span className="text-sm text-[#17E7B3] flex items-center">Instructions</span>
                        </VLink>
                    </div> : <div className="mb-5 text-[#006E72] flex justify-center">
                        <Button onClick={() => { reset(); setTouchedField(false); }} className="flex justify-center font-semibold items-center text-xs leading-[19.57px]">
                            <FiArrowLeft className='mr-[2px] text-lg' /> Go back
                        </Button>
                    </div>}
                </StepperFrame>
            </main>
            {selectedUser && (
                <UserCardModal
                    isOpen={isOpenModal}
                    setModalOpen={setIsOpenModal}
                    user={selectedUser as IUser}
                />
            )}
        </Layout>
    );
};

export default Loading;
