import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';
import type { LearningStatus } from '@/types/supabase';

const STATUSES: LearningStatus[] = ['Learned', 'Learning', 'Planned'];

const learningRoadmapSchema = z.object({
  topic: z.string().trim().min(1, 'Topic is required').max(200),
  status: z.enum(['Learned', 'Learning', 'Planned'], {
    required_error: 'Select a status',
  }),
  notes: z.string(),
  linked_blog_post: z.string(),
});

type LearningRoadmapFormValues = z.infer<typeof learningRoadmapSchema>;

export function LearningRoadmapForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: blogPosts } = useQuery({
    queryKey: ['blog-posts-for-linking'],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog').select('id, title').order('date', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<LearningRoadmapFormValues>({
    resolver: zodResolver(learningRoadmapSchema),
    defaultValues: {
      topic: '',
      status: undefined,
      notes: '',
      linked_blog_post: 'none',
    },
  });

  const onSubmit = async (values: LearningRoadmapFormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('learning_roadmap').insert({
      topic: values.topic,
      status: values.status,
      notes: values.notes.trim() || null,
      linked_blog_post: values.linked_blog_post === 'none' ? null : values.linked_blog_post,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Failed to save topic',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Topic saved', description: `"${values.topic}" was added to the roadmap.` });
    form.reset({ topic: '', status: undefined, notes: '', linked_blog_post: 'none' });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Postgres RLS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linked_blog_post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linked Blog Post</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {blogPosts?.map((post) => (
                    <SelectItem key={post.id} value={post.id}>
                      {post.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional notes" className="min-h-24" {...field} />
              </FormControl>
              <FormMessage />
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
            'Add Topic'
          )}
        </Button>
      </form>
    </Form>
  );
}
