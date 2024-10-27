'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ArrowLeft, Loader2, Pen, Search, Trash2, XCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import NewQuestionModal from './NewQuestionModal'
import { packSchema } from '@/utils/zod/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type PackType =
  | 'wouldyourather'
  | 'neverhaveiever'
  | 'wwyd'
  | 'truth'
  | 'dare'
  | 'topic'
  | 'mixed'

const packTypes = [
  { value: 'wouldyourather', label: 'Would You Rather', id: 'ab' },
  { value: 'neverhaveiever', label: 'Never Have I Ever', id: 'cd' },
  { value: 'wwyd', label: 'What Would You Do', id: 'ef' },
  { value: 'truth', label: 'Truth', id: 'gh' },
  { value: 'dare', label: 'Dare', id: 'ij' },
  { value: 'topic', label: 'Topic', id: 'kl' },
  { value: 'mixed', label: 'Mixed', id: 'mn' }
]

const defaultValues = {
  type: '',
  name: '',
  description: '',
  tags: [],
  questions: []
}

export type PackData = z.infer<typeof packSchema>
function PackForm() {
  const [formData, setFormData] = useLocalStorage<PackData>(
    'PACKVALUES',
    defaultValues as PackData
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    getValues,
    trigger,
    control,
    formState: { errors, isSubmitting }
  } = useForm<PackData>({
    resolver: zodResolver(packSchema),
    defaultValues: formData
  })

  const [tagInputValue, setTagInputValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const step = searchParams.get('step')
  const { tags: selectedTags, questions: addedQuestions, type } = watch()

  function switchStep(step: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('step', step)
    router.push('?' + params.toString())
  }

  // Add tags
  const filterAndAddTag = (tag: string) => {
    const trimmedValue = tag.trim()
    const tagAlreadyExists = selectedTags.includes(trimmedValue)
    const tagsAreLessThanMax = selectedTags.length < 10

    if (trimmedValue && !tagAlreadyExists && tagsAreLessThanMax) {
      const newTags = [...selectedTags, trimmedValue]
      setValue('tags', newTags)
      setFormData({ ...getValues(), tags: newTags })
      setTagInputValue('')
      clearErrors('tags')
    }
  }

  // KEYDOWN listener for tag input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagInputValue.trim()) return

    if (e.key === 'Enter') {
      e.preventDefault()
      filterAndAddTag(tagInputValue)
    }
  }

  // DELETE tags
  const deleteTag = (tagToDelete: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToDelete)
    setValue('tags', updatedTags)
    setFormData({ ...getValues(), tags: updatedTags })
  }

  // SWITCH pack type
  const handleTypeChange = (value: PackType) => {
    setValue('type', value)
    setFormData({ ...getValues(), type: value })
    clearErrors('type')
  }

  // Check all fields are valid before switching steps
  const validateBeforeMoving = async () => {
    const currentValues = getValues()
    const isValid = await trigger(['type', 'name', 'description', 'tags'])

    if (isValid) {
      switchStep('q')
      setFormData(currentValues)
    } else {
      return
    }
  }

  const deleteQuestion = (Qindex: number) => {
    const updatedQuestions = addedQuestions.filter(
      (_, index) => index !== Qindex
    )
    setValue('questions', updatedQuestions)
    setFormData({ ...getValues(), questions: updatedQuestions })
  }

  const onSubmit = async (data: PackData) => {
    console.log(data)
    const endpoint = process.env.NEXT_PUBLIC_API_URL
    try {
      const res = await fetch(`/api/packs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'Successfully submitted your question pack!'
        })
        router.push('/packs')
        // Reset storage
        setFormData(defaultValues as PackData)
      } else {
        // const errorData = await res.json()
        // console.error('Server response:', errorData)
        throw new Error('Failed to submit pack')
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Oops',
        description: 'Something went wrong with creating your pack!',
        variant: 'destructive'
      })
    }
  }

  // NAME and DESCRIPTION are handled by Hook form so they're not automatically updated in local storage on change
  // only when some other field changes I.E type or tags as these pull all the current data from hook-form and set to storage
  // we could potentially store the NAME and DESCRIPTION on change with a useEffect but idk they seem like really simple fields
  // plus i doubt users would refresh all the time. everything is captured and stored before switching steps tho

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          !step || step === 'i' ?
            <section className="grid gap-6 max-w-screen-md">
              {/* select field */}
              <div className="space-y-3">
                <label htmlFor="type">Pack Type</label>
                <Select
                  value={type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pack type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.value}
                        className="text-foreground"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.type.message}
                  </p>
                )}
              </div>
              {/* name field */}
              <div className="space-y-3">
                <label htmlFor="name">Pack name</label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="My awesome pack"
                />
                {errors.name && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* description field */}
              <div className="space-y-3">
                <label htmlFor="description">Pack description</label>
                <Textarea
                  id="description"
                  rows={6}
                  {...register('description')}
                  placeholder="My awesome pack description"
                />
                {errors.description && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* tags field */}
              <div className="space-y-3">
                <label htmlFor="tags">Tags</label>
                <Input
                  id="tags"
                  value={tagInputValue}
                  onChange={(e) => setTagInputValue(e.target.value)}
                  placeholder="Add some cool tags"
                  onKeyDown={handleKeyDown}
                  disabled={selectedTags.length >= 10}
                />
                <div className="flex gap-2 items-center">
                  {selectedTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => deleteTag(tag)}
                      className="flex items-center gap-1 px-2 py-1 mr-1 text-xs rounded-lg dark:bg-[#1D1D1D] bg-background-light cursor-pointer"
                    >
                      <span>
                        <XCircle size={14} />
                      </span>
                      {tag}
                    </button>
                  ))}
                </div>
                {errors.tags && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.tags.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                onClick={validateBeforeMoving}
                className="rounded-lg w-fit py-2 px-4 bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
                size="sm"
              >
                Next
              </Button>
            </section>
            //  second step adding questions to the pack
          : <section className="space-y-8  min-h-[calc(100vh-160px)]">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                  <Button
                    className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                    size="sm"
                    variant="outline"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => switchStep('i')}
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-sm">Pack Questions</span>
                    <Button
                      className="rounded-lg w-fit py-2 px-4"
                      size="sm"
                      variant="outline"
                      type="button"
                      disabled={isSubmitting}
                    >
                      Import JSON
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <span className="text-sm">Submit Packs</span>
                    <Button
                      className="rounded-lg w-fit py-2 px-4 bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
                      size="sm"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <Loader2 size={16} />}
                      {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                  </div>
                </div>
                {errors.questions && (
                  <p className="px-1 text-xs text-brand-red-100">
                    {errors.questions.message}
                  </p>
                )}
              </div>
              <div className="border rounded-xl overflow-hidden divide-y">
                <div className="dark:bg-[#1D1D1D] bg-background-light flex justify-between px-4 py-2 gap-4">
                  <div className="flex items-center gap-4">
                    <p className="block w-fit">Questions</p>
                    <div className="relative">
                      <Search className="size-4 absolute left-2 bottom-3 dark:text-[#666666]" />
                      <Input
                        placeholder="Search for a Question"
                        className="md:w-[441px] pl-8 focus:ring-0"
                      />
                    </div>
                  </div>
                  {/* this can be repurposed for editing questions as well */}
                  <NewQuestionModal
                    control={control}
                    type={type}
                  />
                </div>
                <ul className="divide-y max-h-[700px] overflow-y-auto">
                  {addedQuestions.map((question, index) => (
                    <li
                      key={`${question}-${index}`}
                      className="flex justify-between px-4 py-2 items-center"
                    >
                      <p className="line-clamp-1 text-sm lg:text-base">
                        {question.question}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          size={'icon'}
                          variant={'ghost'}
                          type="button"
                          className="hover:text-brand-blue-100"
                        >
                          <Pen className="size-4" />
                        </Button>
                        <Button
                          size={'icon'}
                          variant={'ghost'}
                          onClick={() => deleteQuestion(index)}
                          type="button"
                          className="hover:text-brand-red-100"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

        }
      </form>
    </div>
  )
}

export default PackForm
