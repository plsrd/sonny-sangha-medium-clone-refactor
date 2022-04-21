import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  setSubmitted: (args: boolean) => void
  _id: string
}

export default function CommentForm({ _id, setSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }
  return (
    <form
      className="my-10 mx-auto mb-10 flex max-w-2xl flex-col p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="mt-2 py-3" />

      <input {...register('_id')} type="hidden" name="_id" value={_id} />

      <label className="mb-5 block" htmlFor="">
        <span className="text-gray-700 ">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          type="text"
          placeholder="Guber"
        />
      </label>
      <label className="mb-5 block" htmlFor="">
        <span className="text-gray-700 ">Email</span>
        <input
          {...register('email', { required: true })}
          className="form-input block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          type="email"
          placeholder="Guber"
        />
      </label>
      <label className="mb-5 block" htmlFor="">
        <span className="text-gray-700 ">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          className="form-text mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
          rows={8}
          placeholder="Guber"
        />
      </label>
      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500">- The Name field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500">- The Email field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">- The Comment field is required</span>
        )}
      </div>
      <input
        type="submit"
        value="Submit"
        className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
      />
    </form>
  )
}
