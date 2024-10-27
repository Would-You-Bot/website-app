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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useController, Control } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { PackData, PackType } from './PackForm'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useLocalStorage } from '@/hooks/use-localstorage'
import { questionSchema } from '@/utils/zod/schemas'
import { z } from 'zod'

interface NewQuestionModalProps {
  control: Control<PackData>
  type: PackType
}

type QuestionType = Exclude<PackType, 'mixed'> 

function NewQuestionModal({ control, type }: NewQuestionModalProps) {
  const {
    field: { onChange, value },
  } = useController({
    name: 'questions',
    control,
    defaultValue: []
  })

  const [questionValue, setQuestionValue] = useState('')
  const [typeValue, setTypeValue] = useState(type === "mixed" ? null : type)
  const [typeError, setTypeError] = useState<string | null>(null)
  const [questionError, setQuestionError] = useState<string | null>(null) 
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useLocalStorage<PackData>('PACKVALUES', {} as PackData)



  const validateQuestion = () => {
    const questionData = {
      question: questionValue,
      type: typeValue as QuestionType
    };

    try {
      questionSchema.parse(questionData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === 'question') {
            setQuestionError(err.message);
          }
          if (err.path[0] === 'type') {
            setTypeError(err.message);
          }
        });
      }
      return false;
    }
  };



  const addQuestion = () => {
    const question = questionValue.trim()
    setQuestionError(null);
    setTypeError(null);

    if (!validateQuestion()) {
      return;
    }


    const newQuestions = [...value, { type: typeValue, question: question }]
    
    try {
      z.array(questionSchema)
        .max(150, 'You can only have 100 questions in a pack')
        .parse(newQuestions);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setQuestionError(error.errors[0].message);
        return;
      }
    }
    
    onChange(newQuestions);
    setQuestionValue('');

    if (formData) {
      // @ts-expect-error ignore this bs
      setFormData({...formData, questions: newQuestions});
      setOpen(false);
    }
  }

  const handleTypeChange = (value: QuestionType) => {
    setTypeValue(value)
    setTypeError(null)
  }

  const handleQuestionInput = (value:string) => {
    setQuestionValue(value)
    if(questionValue && questionValue.trim() !== ""){
      setQuestionError(null)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
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
            Add a <span className="text-brand-red-100">New</span>{' '}
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
            onChange={(e) => handleQuestionInput(e.target.value)}
            className="w-full p-2 dark:bg-[#1D1D1D] rounded-md resize-none"
            placeholder="Question Text"
          />
          {questionError && (
            <p className="px-1 text-xs text-brand-red-100">{questionError}</p>
          )}
        </div>
        {type === 'mixed' && (
          <div className="grid flex-1 gap-2">
            <label
              htmlFor="question"
              className="sr-only"
            >
              Type
            </label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="What type does this question fall under?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wouldyourather">Would you rather</SelectItem>
                <SelectItem value="wwyd">What would you do</SelectItem>
                <SelectItem value="neverhaveiever">Never have I ever</SelectItem>
                <SelectItem value="truth">Truth</SelectItem>
                <SelectItem value="dare">Dare</SelectItem>
                <SelectItem value="topic">Topic</SelectItem>
              </SelectContent>
            </Select>
            {typeError && (
              <p className="px-1 text-xs text-brand-red-100">{typeError}</p>
            )}
          </div>
        )}
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
