import { useState } from "react"
import { useUpdateAvatar } from "./useUsers"

export function useAvatarUploader() {
    const [avatarPreview, setAvatarPreview] = useState('')
    const { mutate, isPending, isError } = useUpdateAvatar()

    const handleAvatarUpload = async (file) => {
        if (!file) return
        setAvatarPreview(URL.createObjectURL(file))
        mutate(file)   // ← pasar el File directo, sin envolver
    }

    return { avatarPreview, isLoading: isPending, isError, handleAvatarUpload }
}