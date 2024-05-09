import { useOutletContext } from 'react-router-dom';
import type { RootContextType } from '../layouts/base';

export function useCurrUserId() {
  return useOutletContext<RootContextType>();
}
