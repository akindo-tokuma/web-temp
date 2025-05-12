export const dynamic = "force-dynamic";
import { originUrl } from "@/lib/env";
import { Job } from "@/lib/types";

export default async function Page() {
  const data = await fetch(`${originUrl}/api/sheet`);
  const res = await data.json();
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            求人情報
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            あなたに合った仕事を見つけましょう
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {res.map((item: Job) => (
            <a 
              href={`/${item.id}`} 
              key={item.id}
              className="block group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-white overflow-hidden shadow-md rounded-lg hover:ring-2 hover:ring-indigo-500 transition-all duration-200">
                <div className="px-6 py-5 border-b border-gray-200 bg-indigo-50">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {item.jobTitle}
                  </h2>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.location || '場所未定'}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.pay || '時給要相談'}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="text-base text-gray-600 mb-3">
                    {item.description || '詳細は求人ページをご覧ください'}
                  </p>
                  {item.shift && (
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{item.shift}</span>
                    </div>
                  )}
                </div>
                <div className="px-6 py-3 bg-gray-50 text-right">
                  <span className="inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                    詳細を見る
                    <svg className="ml-1 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {res.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">求人が見つかりません</h3>
            <p className="mt-1 text-base text-gray-500">現在掲載中の求人はありません。また後ほどお試しください。</p>
          </div>
        )}
      </div>
    </main>
  );
}