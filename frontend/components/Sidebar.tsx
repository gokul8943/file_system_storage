'use client';

import React, { useState } from 'react';
import {
    Home, Star, Clock, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('home');
    const router = useRouter();

    const menuItems = [
        { id: 'home', icon: Home, label: 'Home', count: null },
        { id: 'recent', icon: Clock, label: 'Recent', count: null },
    ];
    const { authState } = useAuthStore();
    const user = authState.user



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
        <div className={`${isCollapsed ? 'w-16' : 'w-55'} h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0`}>
            <div className="p-4 mt-8">
            </div>
            <div className="flex-1 px-3 space-y-1 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.id}
                            item={item}
                            isActive={activeItem === item.id}
                            onClick={() => setActiveItem(item.id)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>
            </div>
            {/* Bottom Menu */}
            <div className="p-3 border-t border-gray-200 space-y-1">
                <MenuItem
                    item={{ id: '', icon: User, label: <span>{user?.username || ''}</span>, count: null }}
                    isActive={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
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
