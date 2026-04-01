import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client - will be null if API key is not set
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewType } = body;

    if (!interviewType) {
      return NextResponse.json(
        { error: 'Interview type is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || !genAI) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Create appropriate prompt based on interview type
    const prompts: Record<string, string> = {
      technical: `Generate 12 technical interview questions for a software engineering position. Include a mix of:
- Data structures and algorithms questions
- System design questions
- Programming fundamentals
- Frontend/Backend specific questions
- Code optimization questions

For each question, provide:
1. The question text
2. A category (e.g., "Data Structures & Algorithms", "System Design", "Programming Fundamentals", etc.)
3. A difficulty level (Easy, Medium, or Hard)
4. For easier questions, provide 4 multiple choice options (optional)

Return the response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Question text here",
    "category": "Category name",
    "difficulty": "Easy|Medium|Hard",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"] // optional, only for simpler questions
  }
]

Make the questions challenging and realistic for actual technical interviews.`,

      hr: `Generate 12 HR interview questions for evaluating a candidate's fit and motivation. Include questions about:
- Professional background and experience
- Company fit and motivation
- Career goals and aspirations
- Work style and preferences
- Compensation expectations
- Questions for the interviewer

For each question, provide:
1. The question text
2. A category (e.g., "Introduction", "Motivation", "Career Goals", etc.)
3. A difficulty level (Easy, Medium, or Hard)

Return the response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Question text here",
    "category": "Category name",
    "difficulty": "Easy|Medium|Hard"
  }
]

Make the questions professional and commonly asked in HR interviews.`,

      behavioral: `Generate 12 behavioral interview questions using the STAR method (Situation, Task, Action, Result). Include questions about:
- Teamwork and collaboration
- Leadership and initiative
- Problem-solving and decision-making
- Conflict resolution
- Time management and prioritization
- Adaptability and learning
- Communication skills

For each question, provide:
1. The question text (should start with "Tell me about a time when..." or similar)
2. A category (e.g., "Teamwork", "Leadership", "Problem Solving", etc.)
3. A difficulty level (Easy, Medium, or Hard)

Return the response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Question text here",
    "category": "Category name",
    "difficulty": "Easy|Medium|Hard"
  }
]

Make the questions realistic and commonly asked in behavioral interviews.`,
    };

    const prompt = prompts[interviewType];
    if (!prompt) {
      return NextResponse.json(
        { error: 'Invalid interview type. Must be technical, hr, or behavioral' },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    // Call Gemini API
    const result = await model.generateContent([
      'You are an expert interview question generator. Always return valid JSON arrays without any markdown formatting or code blocks. Return only the JSON array.',
      prompt,
    ]);

    const response = await result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No content received from Gemini');
    }

    // Parse the response - handle markdown code blocks if present
    let questions;
    try {
      // Remove markdown code blocks if present
      const cleanedContent = content
        .replace(/```json\n/g, '')
        .replace(/```\n/g, '')
        .replace(/```/g, '')
        .trim();

      questions = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', content);
      throw new Error('Failed to parse questions from Gemini response');
    }

    // Validate the response structure
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid response format from Gemini');
    }

    // Ensure each question has the required fields
    const validatedQuestions = questions.map((q, index) => ({
      id: q.id || index + 1,
      question: q.question || '',
      category: q.category || 'General',
      difficulty: q.difficulty || 'Medium',
      ...(q.options && Array.isArray(q.options) && { options: q.options }),
    }));

    return NextResponse.json({
      questions: validatedQuestions,
      interviewType,
    });
  } catch (error: unknown) {
    console.error('Error generating questions:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to generate questions',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
