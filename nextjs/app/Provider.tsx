'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient())
  const [persister] = React.useState(() => createSyncStoragePersister({
    storage: window?window.localStorage: undefined,
  }))

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  )
}