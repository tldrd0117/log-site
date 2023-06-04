import React, { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'
let getQueryClient: any = {}
if(cache){
    getQueryClient = cache(() => new QueryClient())
}
export default getQueryClient
