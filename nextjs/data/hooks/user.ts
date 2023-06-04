import { useMutation, useQuery } from "@tanstack/react-query"
import { loginUser } from "../api/user"

const useLoginQuery = () => {
    return useMutation({
        mutationFn: async () => {
            // await loginUser()

        }
    })
}