import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

const nowSchema = z.object({
  currently_building: z.string(),
  currently_learning: z.string(),
  recently_shipped: z.string(),
});

type NowFormValues = z.infer<typeof nowSchema>;

const linesToArray = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const arrayToLines = (value: string[] | null | undefined) => (value ?? []).join('\n');

export function NowForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // `now` is an intentionally unseeded singleton (id = 1) -- see CLAUDE.md §9.
  // This may return no row on first use; the form still renders empty and upserts on submit.
  const { data: nowRow, isLoading } = useQuery({
    queryKey: ['now-widget'],
    queryFn: async () => {
      const { data, error } = await supabase.from('now').select('*').eq('id', 1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<NowFormValues>({
    resolver: zodResolver(nowSchema),
    defaultValues: {
      currently_building: '',
      currently_learning: '',
      recently_shipped: '',
    },
  });

  useEffect(() => {
    if (nowRow) {
      form.reset({
        currently_building: arrayToLines(nowRow.currently_building),
        currently_learning: arrayToLines(nowRow.currently_learning),
        recently_shipped: arrayToLines(nowRow.recently_shipped),
      });
    }
  }, [nowRow, form]);

  const onSubmit = async (values: NowFormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase
      .from('now')
      .upsert({
        id: 1,
        currently_building: linesToArray(values.currently_building),
        currently_learning: linesToArray(values.currently_learning),
        recently_shipped: linesToArray(values.recently_shipped),
        last_updated: new Date().toISOString(),
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Failed to update Now',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Now widget updated' });
    queryClient.invalidateQueries({ queryKey: ['now-widget'] });
  };

  if (isLoading) {
    return <Loader2 className="size-6 animate-spin text-muted-foreground" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currently_building"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currently Building</FormLabel>
              <FormControl>
                <Textarea placeholder="One item per line" className="min-h-24" {...field} />
              </FormControl>
              <FormDescription>One item per line.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currently_learning"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currently Learning</FormLabel>
              <FormControl>
                <Textarea placeholder="One item per line" className="min-h-24" {...field} />
              </FormControl>
              <FormDescription>One item per line.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recently_shipped"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recently Shipped</FormLabel>
              <FormControl>
                <Textarea placeholder="One item per line" className="min-h-24" {...field} />
              </FormControl>
              <FormDescription>One item per line.</FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Now'
          )}
        </Button>
      </form>
    </Form>
  );
}
