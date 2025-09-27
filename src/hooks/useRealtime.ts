import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useRealtime<T = unknown>(
        table: string,
        onInsert?: (payload: T) => void,
        filter?: string,
) {
        useEffect(() => {
                const channel = supabase
                        .channel(`realtime:${table}:${filter ?? 'all'}`)
                        .on(
                                'postgres_changes',
                                { event: 'INSERT', schema: 'public', table, filter },
                                (payload) => {
                                        onInsert?.(payload.new as T);
                                },
                        )
                        .subscribe();

                return () => {
                        supabase.removeChannel(channel);
                };
        }, [table, filter, onInsert]);
}


