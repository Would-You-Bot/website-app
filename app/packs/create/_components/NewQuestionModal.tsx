import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useController, Control } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { PackData } from './PackForm'
import { Plus } from 'lucide-react'
import { useState } from 'react'

function NewQuestionModal({ control }: { control: Control<PackData> }) {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name: 'questions',
    control,
    defaultValue: []
  })

  const [questionValue, setQuestionValue] = useState('')

  const addQuestion = () => {
    const question = questionValue.trim()
    const localPackValues = localStorage.getItem('PACKVALUES')

    if (!question) return
    onChange([...value, question])
    setQuestionValue('')

    if (localPackValues) {
      const packValues:PackData = JSON.parse(localPackValues)
      const newLocalPackValues = {...packValues, questions: [...packValues.questions, question]}
      localStorage.setItem('PACKVALUES', JSON.stringify(newLocalPackValues))
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'icon'}
          variant={'ghost'}
          type="button"
        >
          <Plus className="text-muted-foreground size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl xl:text-3xl">
            Add a{' '}<span className="text-brand-red-100">New</span>{' '}
            <span className="text-brand-blue-100">Question</span>!
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add a new question to your pack
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <label
            htmlFor="question"
            className="sr-only"
          >
            Question
          </label>
          <Textarea
            id="question"
            rows={5}
            value={questionValue}
            onChange={(e) => setQuestionValue(e.target.value)}
            className="w-full p-2 dark:bg-[#1D1D1D] rounded-md resize-none"
            placeholder="Question Text"
          />
        </div>
        <DialogFooter className="space-x-6 justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="rounded-lg w-fit py-2 px-4"
              size="sm"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="rounded-lg w-fit py-2 px-4 bg-brand-blue-100 hover:bg-brand-blue-200 text-white"
            size="sm"
            type="submit"
            onClick={addQuestion}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewQuestionModal
