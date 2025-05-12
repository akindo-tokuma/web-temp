"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { downloadAsXML, downloadAsCSV } from "@/lib/utils"
import { Job } from "@/lib/types"

function formatDateTime(date: Date | null) {
  if (!date) return "";
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).replace(/\//g, "-").replace(",", "");
}

export default function AdminJobTable() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchJobs = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/sheet")
      if (!res.ok) throw new Error("データ取得に失敗しました")
      const data = await res.json()
      setJobs(data)
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError(String(e))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleXmlOutput = (job: Job) => {
    downloadAsXML([job], `job_${job.id}.xml`, "jobs")
    setJobs(prev =>
      prev.map(j =>
        j.id === job.id
          ? { ...j, xmlOutputed: new Date() }
          : j
      )
    )
  }

  const handleCsvOutput = (job: Job) => {
    downloadAsCSV([job], `job_${job.id}.csv`)
    setJobs(prev =>
      prev.map(j =>
        j.id === job.id
          ? { ...j, csvOutputed: new Date() }
          : j
      )
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">求人管理</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">職種</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">仕事内容</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">勤務地</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">給与</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">シフト</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">XML出力</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CSV出力</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    該当する求人がありません
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium">{job.jobTitle}</td>
                    <td className="px-4 py-3">{job.description}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{job.pay}</td>
                    <td className="px-4 py-3">{job.shift}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleXmlOutput(job)}
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        {job.xmlOutputed ? formatDateTime(job.xmlOutputed) : "出力"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleCsvOutput(job)}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        {job.csvOutputed ? formatDateTime(job.csvOutputed) : "出力"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}