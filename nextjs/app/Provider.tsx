'use client'

import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export default function Providers({ children }: any) {
    const [queryClient] = React.useState(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    // networkMode: 'online',
                },
                mutations: {
                    // networkMode: 'online',  
                }
            }
        })
    })
  const [persister] = React.useState(() => createSyncStoragePersister({
    storage: typeof window != "undefined"? window.localStorage: undefined,
  }))

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}
        onSuccess={() => queryClient.resumePausedMutations()}
        >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}