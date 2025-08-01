import { FC, useRef, useState } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { composeClassNames as cn } from 'shared/helpers';
import { ChipData } from 'types';

import { Chip } from '../Chip';
import { useVisibleCount } from './hooks/useVisibleCount';
import s from './ChipList.module.scss';

const MORE_BUTTON_WIDTH = 50;
const MORE_BUTTON_CSS_VARIABLES = {
  '--button-width': `${MORE_BUTTON_WIDTH}px`,
} as React.CSSProperties;

interface Props {
  chips: ChipData[];
  selectedIds?: number[];
  onSelect?: (chipId: number) => void;
}

export const ChipList: FC<Props> = ({ chips, selectedIds = [], onSelect }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { getTooltipProps, setTooltipRef, setTriggerRef } = usePopperTooltip({
    trigger: 'click',
    placement: 'bottom-end',
    closeOnOutsideClick: false,
    visible: isPopupVisible,
    onVisibleChange: setIsPopupVisible,
  });

  const visibleCount = useVisibleCount({
    chips,
    chipRefs,
    containerRef,
    moreButtonWidth: MORE_BUTTON_WIDTH,
  });

  const visibleChips = chips.slice(0, visibleCount);
  const hiddenChips = chips.slice(visibleCount);

  return (
    <div className={s.root} ref={containerRef}>
      {visibleChips.map((chip, index) => (
        <Chip
          key={chip.id}
          ref={(el) => {
            chipRefs.current[index] = el;
          }}
          label={chip.label}
          selected={selectedIds.includes(chip.id)}
          onClick={() => onSelect?.(chip.id)}
        />
      ))}

      <div
        {...getTooltipProps({
          className: cn(s.tooltip, !isPopupVisible && s.tooltipHidden),
          ref: setTooltipRef,
        })}
      >
        {hiddenChips.map((chip, index) => (
          <Chip
            key={chip.id}
            ref={(el) => {
              chipRefs.current[visibleCount + index] = el;
            }}
            label={chip.label}
            selected={selectedIds.includes(chip.id)}
            onClick={() => onSelect?.(chip.id)}
          />
        ))}
      </div>

      {hiddenChips.length > 0 && (
        <Chip
          className={s.moreButton}
          style={MORE_BUTTON_CSS_VARIABLES}
          ref={setTriggerRef}
          label="..."
          aria-haspopup="true"
          aria-expanded={isPopupVisible}
          onClick={() => setIsPopupVisible((prev) => !prev)}
        />
      )}
    </div>
  );
};
