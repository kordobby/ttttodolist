import { useContext } from "react"
import { TodoContext } from "..";

export function useTodoContext() {
    const context = useContext(TodoContext)
    if (!context) throw new Error('TokenRefreshContext is not provided')
    return context
  }