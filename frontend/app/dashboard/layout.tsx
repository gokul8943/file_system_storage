import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50 lg:flex-row">
            <aside className="w-full h-20 lg:w-64 lg:h-screen flex-shrink-0">
                <Sidebar />
            </aside>
            <main className="flex-1 p-4 mt-7 sm:p-6 md:p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
} 