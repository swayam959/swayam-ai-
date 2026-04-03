'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Upload, FileText, Trash2, Download, Eye } from 'lucide-react';

interface Resume {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
}

export default function ResumePage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([
    { id: '1', name: 'Resume_2026.pdf', uploadDate: 'Feb 15, 2026', size: '245 KB' },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newResume: Resume = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        size: `${Math.round(file.size / 1024)} KB`,
      };
      setResumes([newResume, ...resumes]);
    }
  };

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="hidden lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="mb-4 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Manager</h1>
              <p className="text-gray-500 dark:text-gray-400">Upload and manage your resumes for AI-powered analysis.</p>
            </div>

            {/* Upload Section */}
            <Card className="mb-8">
              <CardBody>
                <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Resume</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <span className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm px-4 py-2 text-sm">
                      Choose File
                    </span>
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Uploaded Resumes */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Resumes</h2>
              </CardHeader>
              <CardBody className="p-0">
                {resumes.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No resumes uploaded yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-indigo-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{resume.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {resume.uploadDate} • {resume.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(resume.id)} title="Delete">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Coming Soon Features */}
            <Card className="mt-8">
              <CardBody className="text-center py-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Resume Analysis Coming Soon</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                  Get AI-powered feedback on your resume, including keyword optimization, formatting suggestions, and ATS compatibility checks.
                </p>
              </CardBody>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar />
        <main className="p-4">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Manager</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Upload and manage your resumes.</p>
          </div>

          {/* Upload Section */}
          <Card className="mb-6">
            <CardBody>
              <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Upload Resume</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">PDF, DOC, or DOCX (Max 5MB)</p>
                <label htmlFor="resume-upload-mobile" className="cursor-pointer">
                  <span className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm px-3 py-1.5 text-sm">
                    Choose File
                  </span>
                </label>
                <input
                  id="resume-upload-mobile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </CardBody>
          </Card>

          {/* Uploaded Resumes */}
          <Card>
            <CardHeader>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Your Resumes</h2>
            </CardHeader>
            <CardBody className="p-0">
              {resumes.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <FileText className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">No resumes uploaded yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="px-4 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{resume.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {resume.uploadDate} • {resume.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(resume.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
