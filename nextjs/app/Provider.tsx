'use client'

import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { RecoilRoot } from 'recoil'

export default function Providers({ children }: any) {
    const [queryClient] = React.useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
                    networkMode: 'always',
                },
                mutations: {
                    cacheTime: 1000, // 24 hours
                    networkMode: 'always',  
                }
            }
        })
    })
  const [persister] = React.useState(() => createSyncStoragePersister({
    storage: typeof window != "undefined"? window.localStorage: undefined,
  }))

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}
        onSuccess={() => {
            console.log("PersistQueryClientProvider onSuccess")
            queryClient.resumePausedMutations()
        }}
        >
        <RecoilRoot>
            {children}
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}