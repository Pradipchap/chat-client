import {  useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from './../../utils/reduxHooks';
import { GET_CHATTERS_ENDPOINT } from '../../constants/endpoints';
import { useState } from 'react';
import {  pushChatters } from '../../redux/slices/UsersSlice';
import { ChatterDetailsInterface } from '../../interfaces/dataInterfaces';
import { CHATTERS_QUERY_KEY } from '../../constants/queryKeys';

export const useGetChatters = () => {
	const [page, setPage] = useState(1);
  const accessToken = useAppSelector(state => state.currentUser.accessToken);
  const dispatch = useAppDispatch();

	const { data,isPending,refetch,error } = useQuery({
		queryKey:[CHATTERS_QUERY_KEY,page],
		staleTime:60*1000,
    queryFn: async () => {
      const response = await fetch(GET_CHATTERS_ENDPOINT+`?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + accessToken
        },
      });
      const results: { users: ChatterDetailsInterface[] } = await response.json();
			dispatch(pushChatters(results.users));
      return results;
    },
    
  });

	return {page,setPage,refetch,isPending,data,error}
}
