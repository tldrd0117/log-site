'use client'

import { useEncPubicKey } from '@/data/query/auth'
import { useVisitMutation } from '@/data/query/visit/query'
import React, { Suspense, useEffect } from 'react'

export const VisitRecord = ({ children }: { children: React.ReactNode }) => {
    const {data, isLoading}: any = useEncPubicKey()
    const {mutate} = useVisitMutation()
    useEffect(() => {
        if(!isLoading && data.algorithm){
            mutate("blog")
        }
    }, [isLoading, data])
    return <>
        { children }
    </>
}