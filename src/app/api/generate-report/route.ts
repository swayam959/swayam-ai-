import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question } from '@/types';

// Initialize Gemini client - will be null if API key is not set
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions, answers, interviewType } = body;

    if (!questions || !answers) {
      return NextResponse.json(
        { error: 'Questions and answers are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || !genAI) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Prepare interview data for analysis
    const interviewData = questions.map((q: Question) => ({
      question: q.question,
      category: q.category,
      difficulty: q.difficulty,
      userAnswer: answers[q.id] || 'No answer provided',
    }));

    const prompt = `You are an expert interview evaluator. Analyze this ${interviewType} interview performance and provide a comprehensive report.

Interview Data:
${JSON.stringify(interviewData, null, 2)}

Provide a detailed evaluation in the following JSON format:
{
  "score": <number between 0-100>,
  "strengths": [<array of 3-5 specific strengths observed>],
  "weaknesses": [<array of 3-5 areas needing improvement>],
  "suggestions": [<array of 5-7 actionable recommendations>],
  "detailedAnalysis": "<2-3 paragraph detailed analysis covering overall performance, key observations, and growth areas>"
}

Evaluation Criteria:
- Completeness and depth of answers
- Technical accuracy (for technical interviews)
- Communication clarity
- Structure and organization (STAR method for behavioral)
- Relevance to the question asked
- Problem-solving approach

Be constructive, specific, and provide actionable feedback. Return ONLY valid JSON without markdown formatting.`;

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No content received from Gemini');
    }

    // Parse the response - handle markdown code blocks if present
    let report;
    try {
      const cleanedContent = content
        .replace(/```json\n/g, '')
        .replace(/```\n/g, '')
        .replace(/```/g, '')
        .trim();

      report = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', content);
      throw new Error('Failed to parse report from Gemini response');
    }

    // Validate the response structure
    if (!report || typeof report.score !== 'number') {
      throw new Error('Invalid report format from Gemini');
    }

    // Add timestamp
    const reportWithTimestamp = {
      ...report,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(reportWithTimestamp);
  } catch (error: unknown) {
    console.error('Error generating report:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to generate report',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
