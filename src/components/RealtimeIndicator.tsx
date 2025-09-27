"use client";
import { useState, useEffect } from 'react';

interface RealtimeIndicatorProps {
	onRefresh: () => void;
	lastUpdate?: Date;
}

export default function RealtimeIndicator({ onRefresh, lastUpdate }: RealtimeIndicatorProps) {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>('');

	useEffect(() => {
		if (!lastUpdate) return;

		const updateTimeSince = () => {
			const now = new Date();
			const diff = now.getTime() - lastUpdate.getTime();
			const seconds = Math.floor(diff / 1000);
			const minutes = Math.floor(seconds / 60);

			if (seconds < 60) {
				setTimeSinceUpdate(`${seconds}s`);
			} else if (minutes < 60) {
				setTimeSinceUpdate(`${minutes}m`);
			} else {
				const hours = Math.floor(minutes / 60);
				setTimeSinceUpdate(`${hours}h`);
			}
		};

		updateTimeSince();
		const interval = setInterval(updateTimeSince, 1000);

		return () => clearInterval(interval);
	}, [lastUpdate]);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await onRefresh();
		setTimeout(() => setIsRefreshing(false), 1000);
	};

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={handleRefresh}
				disabled={isRefreshing}
				className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-50"
			>
				<div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
				<span className="text-xs">
					{isRefreshing ? 'Actualisation...' : 'Temps réel'}
				</span>
			</button>
			
			{timeSinceUpdate && (
				<span className="text-xs text-white/50">
					Mis à jour il y a {timeSinceUpdate}
				</span>
			)}
		</div>
	);
}
