// hooks/useStories.js
import { useState, useMemo, useCallback } from 'react';
import { useFollowing } from './useFollowing';

export function useStories() {
    const { following } = useFollowing();
    // solo usuarios con historias
    const stories = useMemo(() =>
        following.filter(user => user.hasStory),
        [following]
    );

    const [seenStories, setSeenStories] = useState(new Set());

    const onStorySeen = useCallback((userId) => {
        setSeenStories(prev => new Set([...prev, userId]));

        // marcamos en el array derivado
        // (o llamada a API: POST /stories/:id/view)
    }, []);

    // Enriquecemos con estado local de "visto"
    const storiesWithSeenState = useMemo(() =>
        stories.map(story => ({
            ...story,
            isUnseen: !seenStories.has(story.id) && story.isUnseen
        })),
        [stories, seenStories]
    );

    return {
        stories: storiesWithSeenState,
        onStorySeen
    };
}