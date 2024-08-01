import axiosInstance from '@/libs/axiosConfig';
import React, { useEffect, useState } from 'react'

const useScroll = (page: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [data, setData] = useState<object[]>([]);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/v1/books/getallbooks?page=${page}`)
            .then((res) => {
                if (res.data.succes) {
                    setData((pre) => {
                        return [...pre, ...res.data.payload.allBooks];
                    });
                    setHasMore((res.data.payload.hasMore));
                }
                setLoading(false);
            }).catch(console.error);
    }, [page]);

    return (
        {
            loading,
            hasMore,
            data
        }
    )
}

export default useScroll;
