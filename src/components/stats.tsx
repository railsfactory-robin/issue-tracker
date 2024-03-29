import Image from "next/image";
import { IssueProps } from '@/app/(protected)/projects/[projectId]/issues/IssueList'

export default function Stats({ issues }: { issues: Array<IssueProps> }) {
  const SELECTED = issues.filter((issue) => issue.status === 'SELECTED')
  const OPEN = issues.filter((issue) => issue.status === 'OPEN')
  const IN_PROGRESS = issues.filter((issue) => issue.status === 'IN_PROGRESS')
  const TESTING = issues.filter((issue) => issue.status === 'TESTING')
  const CLOSED = issues.filter((issue) => issue.status === 'CLOSED')

  return (
    <div className="col-span-5 grid grid-cols-5 justify-center mx-auto my-2 gap-2 mr-4">
      <div className="shadow-2xl shadow-gray-50 dark:shadow-none border border-violet-50 dark:border-blue-850 bg-white dark:bg-blue-750 rounded-md relative">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full">
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8">
          <p className="font-bold mb-2 text-violet-500 dark:text-violet-60 text-2xl md:text-3xl lg:text-4xl">{SELECTED.length}</p>
          <p className="mb-0 leading-5 text-sm lg:text-base">Analysing</p>
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-50 dark:shadow-none border border-violet-50 dark:border-blue-850 bg-white dark:bg-blue-750 rounded-md relative">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent  w-full">
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8">
          <p className="font-bold mb-2 text-cyan-400 text-2xl md:text-3xl lg:text-4xl">{OPEN.length}</p>
          <p className="mb-0 leading-5 text-sm lg:text-base">Ready to start</p>
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-50 dark:shadow-none border border-violet-50 dark:border-blue-850 bg-white dark:bg-blue-750 rounded-md relative">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-600 to-transparent  w-full">
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8">
          <p className="font-bold mb-2 text-pink-500 dark:text-pink-540 text-2xl md:text-3xl lg:text-4xl">{IN_PROGRESS.length}</p>
          <p className="mb-0 leading-5 text-sm lg:text-base">Work in progress</p>
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-50 dark:shadow-none border border-violet-50 dark:border-blue-850 bg-white dark:bg-blue-750 rounded-md relative">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent  w-full">
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8">
          <p className="font-bold mb-2 text-orange-400 text-2xl md:text-3xl lg:text-4xl">{TESTING.length}</p>
          <p className="mb-0 leading-5 text-sm lg:text-base">Testing in progress</p>
        </div>
      </div>
      <div className="shadow-2xl shadow-gray-50 dark:shadow-none border border-violet-50 dark:border-blue-850 bg-white dark:bg-blue-750 rounded-md relative">
        <div className="flex justify-center -translate-y-[1px]">
          <div className="w-3/4">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-green-600 to-transparent  w-full">
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center p-8">
          <p className="font-bold mb-2 text-green-600 text-2xl md:text-3xl lg:text-4xl">{CLOSED.length}</p>
          <p className="mb-0 leading-5 text-sm lg:text-base">Ready to Deploy</p>
        </div>
      </div>
    </div>
  );
}
