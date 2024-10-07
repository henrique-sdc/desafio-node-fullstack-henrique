import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#191e28] px-4 text-center">
            <div className="space-y-8 max-w-md mx-auto">
                <h1 className="text-6xl font-bold text-slate-200 sm:text-8xl">404</h1>
                <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Página não encontrada</h2>
                <p className="text-white text-base sm:text-lg">
                    Oops, parece que a página que você está procurando não existe.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center h-12 px-6 mt-4 text-sm font-medium text-white bg-gray-600 rounded-md shadow-sm transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                >
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
}