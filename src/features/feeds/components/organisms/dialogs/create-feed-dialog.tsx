'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { getRssFeed } from '@/api/lib/rss';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormItem, FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFeedStore } from '@/store/feed-store';

const validationSchema = z.object({
  feedUrl: z.string().min(1, 'This field is required'),
});

type FormValues = z.infer<typeof validationSchema>;

const defaultValues: FormValues = {
  feedUrl: '',
};

const CreateFeedDialog = ({ open, onClose }: DialogActions) => {
  const addFeed = useFeedStore(state => state.addFeed);

  const addFeedArticle = useFeedStore(state => state.addFeedArticle);

  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await getRssFeed(values.feedUrl);

      const { title, description, link, items, image } = data;

      const feedId = crypto.randomUUID();

      addFeed({
        title,
        description,
        link,
        id: feedId,
        imageUrl: image?.url || '',
      });

      items.forEach(item => {
        addFeedArticle({
          id: crypto.randomUUID(),
          feedId,
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          contentSnippet: item.contentSnippet || '',
          content: item?.['content:encoded'] || '',
          creator: item.creator || '',
          alreadyRead: false,
        });
      });

      onClose?.();

      toast.success('Feed added successfully');
    } catch (error) {
      toast.error('Failed to add feed');
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add feed"
      description="Add a new feed by pasting the RSS feed URL"
      isSubmitButtonDisabled={!form.formState.isDirty}
      isSubmitButtonLoading={form.formState.isSubmitting}
      onSubmit={form.handleSubmit(onSubmit)}
      confirmButtonText="Add">
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="feedUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feed URL</FormLabel>
              <FormControl>
                <Input autoFocus={false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormProvider>
    </Dialog>
  );
};

export default CreateFeedDialog;
