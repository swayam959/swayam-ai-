'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  BarChart2,
  TrendingUp,
  Award,
  Clock,
  ArrowLeft,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { InterviewSession } from '@/types'

const typeVariant: Record<string, 'info' | 'success' | 'warning'> = {
  technical: 'info',
  hr: 'success',
  behavioral: 'warning',
}

export default function ReportsPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<InterviewSession[]>([])
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const completedSessionIds = JSON.parse(
        localStorage.getItem('completed_sessions') || '[]'
      )

      const loadedSessions: InterviewSession[] = []

      completedSessionIds.forEach((sessionId: string) => {
        const sessionData = localStorage.getItem(
          `interview_session_${sessionId}`
        )
        if (sessionData) {
          const session: InterviewSession = JSON.parse(sessionData)
          if (session.status === 'completed') {
            loadedSessions.push(session)
          }
        }
      })

      // 🔥 REMOVE DUPLICATES
      const uniqueSessions = Array.from(
        new Map(loadedSessions.map((s) => [s.id, s])).values()
      )

      uniqueSessions.sort(
        (a, b) =>
          new Date(b.startTime).getTime() -
          new Date(a.startTime).getTime()
      )

      setSessions(uniqueSessions)
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const avgScore =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + (s.report?.score || 0), 0) /
            sessions.length
        )
      : 0

  const totalInterviews = sessions.length
  const totalDuration = sessions.reduce(
    (acc, s) => acc + (s.duration || 0),
    0
  )

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString()
  }

  const toggleExpanded = (id: string) => {
    setExpandedSession(expandedSession === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">

            {/* HEADER */}
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <h1 className="text-3xl font-bold mt-4">
                Performance Reports
              </h1>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card>
                <CardBody>
                  Total Interviews: {totalInterviews}
                </CardBody>
              </Card>
              <Card>
                <CardBody>Average Score: {avgScore}%</CardBody>
              </Card>
              <Card>
                <CardBody>Total Time: {totalDuration}</CardBody>
              </Card>
            </div>

            {/* LIST */}
            <Card>
              <CardBody>
                {sessions.map((session, index) => (
                  <div
                    key={session.id + '_' + index} // ✅ FIXED KEY
                    className="border-b p-4"
                  >
                    <div
                      onClick={() => toggleExpanded(session.id)}
                      className="flex justify-between cursor-pointer"
                    >
                      <div>
                        <Badge variant={typeVariant[session.interviewType]}>
                          {session.interviewType}
                        </Badge>
                        <p>{formatDate(session.startTime)}</p>
                      </div>

                      <div>
                        {session.report?.score}%
                        {expandedSession === session.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </div>
                    </div>

                    {expandedSession === session.id && session.report && (
                      <div className="mt-4 text-sm">
                        <p>
                          <b>Strengths:</b>{' '}
                          {session.report.strengths.join(', ')}
                        </p>
                        <p>
                          <b>Weaknesses:</b>{' '}
                          {session.report.weaknesses.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}