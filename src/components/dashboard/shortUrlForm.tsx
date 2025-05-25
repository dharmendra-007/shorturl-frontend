'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Zap, ExternalLink, Loader } from 'lucide-react';
import { useState } from 'react';
import { CopyButton } from '../common/copy-button';
import Link from 'next/link';
import { ShortUrlSchema, ShortUrlSchemaType } from '@/schema/shortUrlSchema';
import API from '@/lib/axios';

export default function ShortLinkCard() {
  const [shortUrl, setShortUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShortUrlSchemaType>({
    resolver: zodResolver(ShortUrlSchema),
  });

  const onSubmit = async (value: ShortUrlSchemaType) => {
    API.post('/api/v1/url',{
      "url" : value.url
    })
      .then((res) => {
        if(res.data.success){
          setShortUrl('https://short-url-backend-nine.vercel.app/' + res.data.id)
        }
      })
  };

  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Short Link
        </CardTitle>
        <CardDescription>Quickly shorten a new URL</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter URL to shorten..."
              {...register('url')}
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              {isSubmitting ? <Loader className='animate-spin'/> : 
              <span className='flex gap-2 items-center justify-center text-base'>
                <Zap className="h-4 w-4" /> Shorten
              </span>}
            </Button>
          </div>
          {errors.url && <p className="text-sm text-red-500 mt-1">{errors.url.message}</p>}
        </form>

        {shortUrl && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{shortUrl}</span>
              <div className="flex gap-1">
                <CopyButton text={shortUrl} className="h-8 w-8" />
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={shortUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
}
