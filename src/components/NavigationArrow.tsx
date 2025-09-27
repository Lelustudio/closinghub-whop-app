"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationArrowProps {
    href?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export default function NavigationArrow({ 
    href, 
    onClick, 
    className = "",
    children = "← Back"
}: NavigationArrowProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed top-6 left-6 z-50 px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 ${className}`}
            style={{
                background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
        >
            <div className="flex items-center gap-2">
                <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="text-sm font-medium">{children}</span>
            </div>
        </button>
    );
}
