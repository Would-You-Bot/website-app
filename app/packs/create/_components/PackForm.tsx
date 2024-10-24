'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ArrowLeft, Pen, Search, Trash2, XCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import NewQuestionModal from './NewQuestionModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { packSchema } from '@/utils/zod/schemas'
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
  { value: 'topic', label: 'Truth', id: 'kl' },
  { value: 'mixed', label: 'Mixed', id: 'mn' }
]

export type PackData = z.infer<typeof packSchema>

function PackForm() {
  const localPackValues = localStorage.getItem('PACKVALUES')
  const defaultValues: PackData =
    localPackValues ?
      JSON.parse(localPackValues)
    : { type: '', name: '', description: '', tags: [], questions: [] }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    control,
    formState: { errors, isLoading }
  } = useForm<PackData>({
    resolver: zodResolver(packSchema),
    defaultValues: { ...defaultValues }
  })
  const [tagInputValue, setTagInputValue] = useState('')
  const [step, setStep] = useState(1)
  const router = useRouter()
  //   we could use url params to determine the step
  //   for now i think this works

  const selectedTags = watch('tags') // watches the tags array for changes
  const addedQuestions = watch('questions') // watches the questions array for changes

  const filterAndAddTag = (tag: string) => {
    const trimmedValue = tag.trim()
    const tagAlreadyExists = selectedTags.includes(trimmedValue)
    const tagsAreLessThanMax = selectedTags.length < 10

    if (trimmedValue && !tagAlreadyExists && tagsAreLessThanMax) {
      setValue('tags', [...selectedTags, trimmedValue])
      setTagInputValue('')
      clearErrors('tags')
    }
  }

  const deleteTag = (tagToDelete: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToDelete)

    setValue('tags', updatedTags)

    localStorage.setItem(
      'PACKVALUES',
      JSON.stringify({ ...defaultValues, tags: updatedTags })
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tagInputValue.trim()) return

    if (e.key === 'Enter') {
      e.preventDefault()
      filterAndAddTag(tagInputValue)
    }
  }

  const handleTypeChange = (value: PackType) => {
    setValue('type', value)
    clearErrors('type')
  }

  const validateBeforeMoving = () => {
    const { type, name, description, tags } = watch()
    if (type && name && description && tags.length) {
      setStep(2)
      localStorage.setItem(
        'PACKVALUES',
        JSON.stringify({
          type,
          name,
          description,
          tags,
          questions: defaultValues.questions ?? []
        })
      )
    } else {
      trigger(['type', 'name', 'description', 'tags'])
    }
  }

  const onSubmit = async (data: PackData) => {
    //  not sure what to do here
    //  for now log the data and show a toast for dev purposes
    console.log(data)
    localStorage.removeItem('PACKVALUES')
    toast({
      title: 'Success!',
      description: 'Successfully submitted your question pack!'
    })

    router.push('/packs')
  }

  const deleteQuestion = (Qindex: number) => {
    const updatedQuestions = addedQuestions.filter(
      (_, index) => index !== Qindex
    )

    setValue('questions', updatedQuestions)

    localStorage.setItem(
      'PACKVALUES',
      JSON.stringify({ ...defaultValues, questions: updatedQuestions })
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          step === 1 ?
            <section className="grid gap-6 max-w-screen-md">
              {/* select field */}
              <div className="space-y-3">
                <label htmlFor="type">Pack Type</label>
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pack type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.value}
                        defaultChecked={type.value === defaultValues.type}
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
              <div className="flex items-center gap-6 lg:gap-10">
                <Button
                  className="rounded-lg w-fit py-2 px-4 flex gap-2 self-end"
                  size="sm"
                  variant="secondary"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-sm">Pack Questions</span>
                  <Button
                    className="rounded-lg w-fit py-2 px-4"
                    size="sm"
                    variant="secondary"
                    type="button"
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
                  >
                    Submit
                  </Button>
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
                  <NewQuestionModal control={control} />
                </div>
                <ul className="divide-y max-h-[700px] overflow-y-auto">
                  {addedQuestions.map((question: string, index) => (
                    <li
                      key={`${question}-${index}`}
                      className="flex justify-between px-4 py-2 items-center"
                    >
                      <p className="line-clamp-1 lg:text-lg">{question}</p>
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
