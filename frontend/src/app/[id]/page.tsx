import { originUrl } from "@/lib/env";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await fetch(`${originUrl}/api/sheet/${id}`);
    const res = await data.json();
    // {
    //     id: 2,
    //     jobTitle: '倉庫ピッキング',
    //     description: '商品の仕分けと棚入れ',
    //     location: '苫小牧市',
    //     pay: '時給1100円',
    //     shift: '月〜金・8:30〜17:00'
    //   }
    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        求人一覧に戻る
                    </Link>
                </div>

                {/* Job Title Header */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 border-t-4 border-indigo-500">
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {res.name || res.jobTitle}
                            </h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                募集中
                            </span>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                            {res.location && (
                                <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                    <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {res.location}
                                </div>
                            )}
                            {res.pay && (
                                <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                    <svg className="h-4 w-4 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                    {res.pay}
                                </div>
                            )}
                            {res.shift && (
                                <div className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                                    <svg className="h-4 w-4 mr-1 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    {res.shift}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <svg className="h-5 w-5 mr-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            仕事内容
                        </h2>
                        <div className="prose prose-indigo max-w-none text-gray-600">
                            <p className="text-base leading-relaxed">
                                {res.description || "詳細な説明はありません。"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Job Requirements & Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Requirements */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
                        <div className="px-6 py-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                応募条件
                            </h2>
                            <ul className="space-y-3 text-base text-gray-600">
                                {res.requirements ? (
                                    // If requirements exist, map them
                                    res.requirements.map((req: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {req}
                                        </li>
                                    ))
                                ) : (
                                    // Default requirements
                                    <>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            特別なスキルは不要です
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            未経験者歓迎
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            高校生不可
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden h-full">
                        <div className="px-6 py-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg className="h-5 w-5 mr-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                お仕事の特徴
                            </h2>
                            <ul className="space-y-3 text-base text-gray-600">
                                {res.benefits ? (
                                    // If benefits exist, map them
                                    res.benefits.map((benefit: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {benefit}
                                        </li>
                                    ))
                                ) : (
                                    // Default benefits
                                    <>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            交通費支給
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            社員登用あり
                                        </li>
                                        <li className="flex items-start">
                                            <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            週払い制度あり
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-6 text-center">
                        <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10 transition-colors duration-200 transform hover:scale-105">
                            応募する
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <p className="mt-3 text-sm text-gray-500">応募後、担当者より連絡があります</p>
                    </div>
                </div>
            </div>
        </main>
    );
}