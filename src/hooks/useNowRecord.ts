import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export function useNowRecord() {
  return useQuery({
    queryKey: ['now-record'],
    queryFn: async () => {
      const { data, error } = await supabase.from('now').select('*').eq('id', 1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}
