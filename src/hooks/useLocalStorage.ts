import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T | (() => T)) => {
    const [value, setValue] = useState<T>(() => {
        const localData = localStorage.getItem(key);
        if (localData) return JSON.parse(localData);
        if (typeof defaultValue === 'function') return (defaultValue as () => T)();
        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue];
}

export default useLocalStorage;