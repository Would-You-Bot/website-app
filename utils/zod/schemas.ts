import z from "zod"

export const packSchema = z.object({
  type: z.enum(
    [
      'wouldyourather',
      'neverhaveiever',
      'wwyd',
      'truth',
      'dare',
      'topic',
      'mixed'
    ],
    {
      required_error: 'Please select a valid pack type',
      message: 'Please select a valid pack type'
    }
  ),
  name: z.string().min(4, 'Make sure your packs name is atleast 4 characters long').max(100, "Make sure your packs name is only 100 characters long"),
  description: z.string().min(10, "Make sure your packs description is atleast 10 characters long").max(500, "Make sure your packs description is only 500 characters long"),
  tags: z.array(z.string()).min(1, 'At least one tag is required').max(10),
  questions: z.array(z.object({
    question: z.string().min(10, "Make sure your question is atleast 10 characters long").max(100, "Make sure your question is only 100 characters long"),
    type: z.enum(
      ['truth', 'dare', 'wouldyourather', 'neverhaveiever', 'wwyd', 'topic'],
      {
        required_error: 'Please select a valid question type',
        message: 'Please select a valid question type'
      }
    )
  })).min(1, 'At least one question is required').max(150, 'You can only have 100 questions in a pack')
})
