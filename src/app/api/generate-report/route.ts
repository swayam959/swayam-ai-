import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Question } from '@/types'

// Initialize Gemini client
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { questions, answers, interviewType } = body

    if (!questions || !answers) {
      return NextResponse.json(
        { error: 'Questions and answers are required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY || !genAI) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      )
    }

    // Prepare interview data
    const interviewData = questions.map((q: Question) => ({
      question: q.question,
      category: q.category,
      difficulty: q.difficulty,
      userAnswer: answers[q.id] || 'No answer provided',
    }))

    const prompt = `
You are an expert interview evaluator.

Analyze this ${interviewType} interview and return STRICT JSON ONLY.

Interview Data:
${JSON.stringify(interviewData, null, 2)}

Return EXACTLY in this format:

{
  "score": number (0-100),
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."],
  "detailedAnalysis": "..."
}

IMPORTANT:
- No markdown
- No explanation
- No text outside JSON
`

    // ✅ FIXED MODEL (STABLE)
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    })

    // ✅ FIXED REQUEST FORMAT
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    })

    const content = result.response.text()

    if (!content) {
      throw new Error('No content received from Gemini')
    }

    // ✅ BULLETPROOF PARSER
    let report
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)

      if (!jsonMatch) {
        throw new Error('No JSON found')
      }

      const cleaned = jsonMatch[0]
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      report = JSON.parse(cleaned)
    } catch (err) {
      console.error('RAW GEMINI RESPONSE:', content)

      // ✅ FALLBACK (NO CRASH)
      report = {
        score: 50,
        strengths: ['Unable to analyze properly'],
        weaknesses: ['Parsing error occurred'],
        suggestions: ['Try again'],
        detailedAnalysis: 'AI response could not be parsed.',
      }
    }

    // ✅ SAFE VALIDATION
    if (typeof report.score !== 'number') {
      report.score = 50
    }

    const finalReport = {
      ...report,
      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json(finalReport)
  } catch (error: any) {
    console.error('Error generating report:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate report',
        details: error.message,
      },
      { status: 500 }
    )
  }
}