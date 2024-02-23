"use client"

import { useQuery } from '@apollo/client';
import { GET_USER_LIST } from '@/graphql/user';
import { CursorBasedList } from '@/types/api-response';
import { UserWithRole } from '@/types/user';
import { useState } from 'react';

export default function UserTable() {
  const [perPage, setPerPage] = useState<number>(5);
  const [afterCursor, setAfterCursor] = useState<string | undefined>(undefined);

  const { loading, error, data } = useQuery(GET_USER_LIST, {
    variables: {
      first: perPage,
      after: afterCursor,
    }
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error! ${error.message}</p>;

  const { totalCount, edges, pageCursors } = data.users as CursorBasedList<UserWithRole>;

  return (
    <div className="relative overflow-x-auto rounded-lg">
      {/* 
        overflow-x-auto 가로 스크롤링이 가능하도록 함, e.g. 아래 table이 div의 width 보다 길어지면 가로 스크롤링
        rounded-lg 모서리에 둥근 테두리 적용, rounded, rounded-md, rounded-lg 순으로 더 둥글어짐
      */}

      <table className="w-full text-sm text-left text-gray-500 my-8">
        <thead className="text-md text-gray-700 uppercase bg-gray-50">
          <tr>
            {/* 
              scope="col" 테이블의 헤더 셀을 정의하는 태그, 스크린 리더 등의 보조 기술에서 테이블을 읽을 때, 셀의 역할을 정확히 이해할 수 있도록 도와준다
              whitespace-nowrap 텍스트가 줄 바꿈 없이 한 줄에 계속 표시되도록 한다
            */}
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              user id
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              role
            </th>
            <th scope="col" className="px-6 py-3">
              registration date
            </th>
            <th scope="col" className="px-6 py-3">
              {/* 
                sr-only 요소를 숨기되, 스크린 리더에서는 보이도록 한다
              */}
              <span className="sr-only">not shown</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {edges.map((edge, idx) => {
            const { node: user } = edge;
            return (
              <tr key={`each-user-${idx}`} className="bg-white border-b hover:bg-gray-50">
                {/* 
                  border-b b는 bottom, 아래에 border가 생기게 함
                */}
                <td className="px-6 py-4">
                  {user.userId}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.userEmail}
                </th>
                <td className="px-6 py-4">
                  {user.userRole.roleName}
                </td>
                <td className="px-6 py-4">
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 text-right">
                  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Light</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <nav className="flex justify-center">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" disabled={!pageCursors.previous?.cursor} onClick={() => setAfterCursor(pageCursors.previous?.cursor)}>
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>
          {pageCursors.around.map((cursor, idx) => (
            <li key={`each-page-${idx}`}>
              {cursor.isCurrent
                ? <button aria-current="page" className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700" onClick={() => setAfterCursor(cursor.cursor)}>{cursor.page}</button>
                : <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => setAfterCursor(cursor.cursor)}>{cursor.page}</button>
              }

            </li>
          ))}
          <li>
            <button className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" disabled={!pageCursors.next?.cursor} onClick={() => setAfterCursor(pageCursors.next?.cursor)}>
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}