import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon} from '@heroicons/react/outline';
import { useForm} from 'react-hook-form';

type FormData = {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

function PostBox() {
  const {data: session} = useSession()
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData)
  })

  return (
    <form 
      onSubmit={onSubmit} 
      className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2'>
      <div className='flex items-center space-x-3'>
        {/* Avatar */}
        <Avatar />

        <input
          {...register('postTitle', {required: true})}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text" 
          placeholder={
            session? 'create a post by entering a title!' : 'Sign in to post'
          }
        />

        <PhotographIcon 
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 
          ${imageBoxOpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className='h-6 text-gray-300'/>
      </div>

      {!!watch('postTitle') && (
        <div className='flex flex-col py-2'>
          {/* Body '*/}
          <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Body</p>
            <input
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('postBody')} 
              type="text" 
              placeholder="Text (optional)"
            />
        </div>


        <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>Subreddit:</p>
            <input
              className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('subreddit', {required: true})} 
              type="text" 
              placeholder="i.e. reactjs"
            />
        </div>

        {imageBoxOpen && (
            <div className='flex items-center px-2'>
            <p className='min-w-[90px]'>ImageURL:</p>
              <input
               className='m-2 flex-1 bg-blue-50 p-2 outline-none'
              {...register('postImage')} 
              type="text" 
              placeholder="Optional..."
            />
            </div>
            )}

          {Object.keys(errors).length > 0 &&(
            <div className='space-y-2 p-2 text-red-500'>
              {errors.postTitle?.type === 'required' && (
                <p>A post title is required</p>
              )}
            </div>
          )}
        </div>
      )}

      {!!watch('postTitle') && (
        <button className='w-full rounded-full bg-blue-400 p-2 text-white'>
          Create Post
        </button>
      )}
    </form>
  )
}

export default PostBox