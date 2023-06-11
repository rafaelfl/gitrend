import React, { useCallback, useEffect, useState } from 'react';
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
            setShowRightButton(scrollLeft + 2 < maxScrollLeft);
        }
    }, []);

    const scrollLeft = useCallback(() => {
        const scrollSlots = scrollSlotsRef.current;

        if (scrollSlots) {
            scrollSlots.scrollBy({ left: -400, behavior: 'smooth' });
        }
    }, []);

    const scrollRight = useCallback(() => {
        const scrollSlots = scrollSlotsRef.current;

        if (scrollSlots) {
            scrollSlots.scrollBy({ left: 400, behavior: 'smooth' });
        }
    }, []);

    useResizeObserver(scrollSlotsRef, () => onScroll());

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            event.deltaY < 0 ? scrollLeft() : scrollRight();
        };

        const scrollSlots = scrollSlotsRef.current;

        scrollSlots?.addEventListener('wheel', handleWheel, { capture: true });

        return () => {
            const scrollSlots = scrollSlotsRef.current;

            scrollSlots?.removeEventListener('wheel', handleWheel);
        };
    }, [scrollSlotsRef]);

    return (
        <ScrollingContainer>
            <ScrollingWrapper data-testid="@ListView/scrollSlot" ref={scrollSlotsRef} onScroll={onScroll}>
                {children}
            </ScrollingWrapper>
            <ScrollLeftButton
                visible={showLeftButton}
                onClick={scrollLeft}
                aria-label="Scroll list of trending developers to the left"
            >
                <i className="fas fa-angle-left"></i>
            </ScrollLeftButton>
            <ScrollRightButton
                visible={showRightButton}
                onClick={scrollRight}
                aria-label="Scroll list of trending developers to the right"
            >
                <i className="fas fa-angle-right"></i>
            </ScrollRightButton>
        </ScrollingContainer>
    );
};
