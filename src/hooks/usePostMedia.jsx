import { useState, useEffect, useCallback, useMemo } from "react";
import { validateFile } from '../utils/validateUtils.js'


export function usePostMedia({ maxFiles = 1 } = {}) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [error, setError] = useState(null);

    const previewUrls = useMemo(() => {
        return selectedFiles.map(file => URL.createObjectURL(file))
    }, [selectedFiles]);

    useEffect(() => {
        return () => {
            previewUrls.forEach(url => URL.revokeObjectURL(url))
        };
    }, [previewUrls]);

    const handleFileChange = useCallback((e) => {
        setError(null);

        const files = Array.from(e.target.files || []);

        if (files.length > maxFiles) {
            setError(`Only ${maxFiles} images can be uploaded per post.`);
            e.target.value = "";
            return;
        }
        // Validar cada archivo
        for (const file of files) {
            const err = validateFile(file);
            if (err) {
                setError(err);
                e.target.value = "";
                return;
            }
        }

        setSelectedFiles(files);

    }, [maxFiles]);

    const handleRemoveFile = useCallback((index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const canAddMore = selectedFiles.length < maxFiles;

    return {
        error, handleFileChange, handleRemoveFile, canAddMore, selectedFiles, setError, setSelectedFiles, previewUrls
    }

}