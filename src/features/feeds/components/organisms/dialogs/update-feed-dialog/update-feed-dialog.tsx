'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormItem, FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFeedStore } from '@/store/feed-store';

const validationSchema = z.object({
  title: z.string().min(1, { message: 'This field is required' }),
  description: z.string(),
});

type FormValues = z.infer<typeof validationSchema>;

const defaultValues: FormValues = {
  title: '',
  description: '',
};

interface Props extends DialogActions {
  feedId: string;
  selectedFeedTitle: string;
  selectedFeedDescription: string;
}

const UpdateFeedDialog = ({ open, onClose, feedId, selectedFeedTitle, selectedFeedDescription }: Props) => {
  const updateFeed = useFeedStore(state => state.updateFeed);

  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (values: FormValues) => {
    updateFeed({
      id: feedId,
      title: values.title,
      description: values.description,
    });

    onClose?.();

    toast.success('Feed updated successfully');
  };

  useEffect(() => {
    if (open) {
      form.reset({
        title: selectedFeedTitle || defaultValues.title,
        description: selectedFeedDescription || defaultValues.description,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Update feed"
      description="Update the feed details"
      isSubmitButtonDisabled={!form.formState.isValid || !form.formState.isDirty}
      isSubmitButtonLoading={form.formState.isSubmitting}
      onSubmit={form.handleSubmit(onSubmit)}
      confirmButtonText="Update">
      <FormProvider {...form}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateFeedDialog;
