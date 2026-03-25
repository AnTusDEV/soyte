import { useState } from 'react';
import { getDefaultDates } from '@/utils/dateUtils';

export type DateFilter = {
    startDate: string;
    endDate: string;
};

const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const useReportFilter = () => {
    const [filterType, setFilterType] = useState('this_year');
    const [dateFilter, setDateFilter] = useState<DateFilter>(getDefaultDates());

    const handleFilterChange = (newType: string) => {
        setFilterType(newType);
        if (newType === 'custom') return;

        const now = new Date();
        const year = now.getFullYear();
        let start = new Date();
        let end = new Date();

        if (newType === 'this_month') {
            start = new Date(year, now.getMonth(), 1);
            end = new Date(year, now.getMonth() + 1, 0);
        } else if (newType === 'last_month') {
            start = new Date(year, now.getMonth() - 1, 1);
            end = new Date(year, now.getMonth(), 0);
        } else if (newType === 'first_half') {
            start = new Date(year, 0, 1);
            end = new Date(year, 5, 30);
        } else if (newType === 'this_year') {
            start = new Date(year, now.getMonth() - 11, 1);
            end = new Date(year, now.getMonth() + 1, 0);
        } else if (newType === 'second_half') {
            start = new Date(year, 6, 1);
            end = new Date(year, 11, 31);
        }

        setDateFilter({ startDate: formatDate(start), endDate: formatDate(end) });
    };

    const handleCustomDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
        if (date) {
            setDateFilter(prev => ({ ...prev, [field]: formatDate(date) }));
        }
    };

    return { filterType, dateFilter, handleFilterChange, handleCustomDateChange };
};
