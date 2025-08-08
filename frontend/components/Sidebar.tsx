'use client';

import React, { useState, useEffect } from 'react';
import {
    Home, Star, Clock, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('home');
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
        { id: 'recent', icon: Clock, label: 'Recent', path: '/recent' },
    ];
    const { authState } = useAuthStore();
    const user = authState.user;

    // Set active item based on current pathname
    useEffect(() => {
        const currentItem = menuItems.find(item => item.path === pathname);
        if (currentItem) {
            setActiveItem(currentItem.id);
        } else if (pathname === '/') {
            setActiveItem('dashboard');
        }
    }, [pathname]);

    const handleMenuItemClick = (item: any) => {
        setActiveItem(item.id);
        router.push(item.path);
    };

    const MenuItem = ({ item, isActive, onClick }: any) => {
        const Icon = item.icon;

        return (
            <button
                onClick={onClick}
                className={`w-full flex items-center p-3 justify-between rounded-lg transition-all duration-200 group ${isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
            >
                <div className="flex items-center space-x-3">
                    <Icon size={20} className={`${isActive ? 'text-blue-700' : 'text-gray-500'} group-hover:text-gray-700`} />
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {!isCollapsed && item.count !== null && (
                    <span className={`text-xs px-2 py-1 rounded-full ${isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                        }`}>
                        {item.count}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-72'} h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out`}>
            <div className="p-6 mt-8">
            </div>
            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            isActive={activeItem === item.id}
                            onClick={() => handleMenuItemClick(item)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>
            </div>
            {/* Bottom Menu */}
            <div className="p-4 border-t border-gray-200 space-y-1">
                <MenuItem
                    item={{ id: 'profile', icon: User, label: <span>{user?.username || 'Profile'}</span>, count: null }}
                    isActive={activeItem === 'profile'}
                    onClick={() => setActiveItem('profile')}
                />
                <MenuItem
                    item={{ id: 'logout', icon: Star, label: 'Logout', count: null }}
                    isActive={activeItem === 'logout'}
                    onClick={() => {
                        useAuthStore.getState().logout();
                        router.push('/signIn');
                    }}
                />
            </div>
        </div>
    );
};

export default Sidebar;
