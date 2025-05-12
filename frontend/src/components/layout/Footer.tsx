import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 right-0">
            <div className="flex gap-4">
                <Link href="/">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ユーザー画面トップ</button>
                </Link>
                <Link href="/admin">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">管理者画面トップ</button>
                </Link>
            </div>
        </footer>
    )
}