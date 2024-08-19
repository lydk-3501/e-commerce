import { SortParams } from '../sort.type';

export interface ComponentProps {
    params: SortParams;
    setParams: React.Dispatch<React.SetStateAction<SortParams>>;
}
