import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { seedProjects } from '@/data/seedData';
import type { PostType } from '@/types/supabase';

const POST_TYPES: PostType[] = ['thought', 'learning-note', 'paper-review', 'product-find', 'essay'];

const blogPostSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(200)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated'),
  date: z.string().min(1, 'Date is required'),
  tags: z.string(), // comma-separated, split on submit
  post_type: z.enum(['thought', 'learning-note', 'paper-review', 'product-find', 'essay'], {
    required_error: 'Select a post type',
  }),
  excerpt: z.string().trim().min(1, 'Excerpt is required').max(500),
  content: z.string().trim().min(1, 'Content is required'),
  linked_project: z.string(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export function BlogPostForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      date: new Date().toISOString().slice(0, 10),
      tags: '',
      post_type: undefined,
      excerpt: '',
      content: '',
      linked_project: 'none',
    },
  });

  const onSubmit = async (values: BlogPostFormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('blog').insert({
      title: values.title,
      slug: values.slug,
      date: values.date,
      tags: values.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      post_type: values.post_type,
      excerpt: values.excerpt,
      content: values.content,
      linked_project: values.linked_project === 'none' ? null : values.linked_project,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Failed to save post',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Post saved', description: `"${values.title}" was added to the blog.` });
    form.reset({
      title: '',
      slug: '',
      date: new Date().toISOString().slice(0, 10),
      tags: '',
      post_type: undefined,
      excerpt: '',
      content: '',
      linked_project: 'none',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="post-title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="post_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {POST_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="comma, separated, tags" {...field} />
              </FormControl>
              <FormDescription>Comma-separated.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linked_project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linked Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {seedProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
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
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Short summary" className="min-h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea placeholder="# Post content" className="min-h-48 font-mono text-sm" {...field} />
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
            'Add Post'
          )}
        </Button>
      </form>
    </Form>
  );
}
