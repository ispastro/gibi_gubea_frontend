import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';

const dispatch: AppDispatch = useDispatch();
const user = useSelector((state: RootState) => state.user);
