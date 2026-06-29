import { useState } from "react"
import { useUpdateAvatar } from "./useUsers"

export function useAvatarUploader(userId) {
    const [avatarPreview, setAvatarPreview] = useState('')
    const { mutate, isPending, isError } = useUpdateAvatar()

    const handleAvatarUpload = async (file) => {
        if (!file) return
        setAvatarPreview(URL.createObjectURL(file))
        mutate({ id: userId, file })
    }

    return { avatarPreview, isLoading: isPending, isError, handleAvatarUpload }
}