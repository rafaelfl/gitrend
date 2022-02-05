import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '../../hooks';
import { ScrollingContainer, ScrollingWrapper, ScrollLeftButton, ScrollRightButton } from './styles';

interface ListViewProps {
    children: React.ReactNode;
}

export const ListView = ({ children }: ListViewProps): JSX.Element => {
    const scrollSlotsRef = React.useRef<HTMLDivElement>(null);

    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const onScroll = useCallback(() => {
        const scrollSlots = scrollSlotsRef.current;

        if (scrollSlots) {
            const scrollLeft = scrollSlots.scrollLeft;
            const maxScrollLeft = scrollSlots.scrollWidth - scrollSlots.clientWidth;

            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < maxScrollLeft);
        }
    }, []);

    const scrollLeft = useCallback(() => {
        const scrollSlots = scrollSlotsRef.current;

        if (scrollSlots) {
            scrollSlots.scrollBy({ left: -100, behavior: 'smooth' });
        }
    }, []);

    const scrollRight = useCallback(() => {
        const scrollSlots = scrollSlotsRef.current;

        if (scrollSlots) {
            scrollSlots.scrollBy({ left: 100, behavior: 'smooth' });
        }
    }, []);

    useResizeObserver(scrollSlotsRef, () => onScroll());

    return (
        <ScrollingContainer>
            <ScrollingWrapper ref={scrollSlotsRef} onScroll={onScroll}>
                {children}
            </ScrollingWrapper>
            <ScrollLeftButton visible={showLeftButton} onClick={scrollLeft}>
                <i className="fas fa-angle-left"></i>
            </ScrollLeftButton>
            <ScrollRightButton visible={showRightButton} onClick={scrollRight}>
                <i className="fas fa-angle-right"></i>
            </ScrollRightButton>
        </ScrollingContainer>
    );
};
