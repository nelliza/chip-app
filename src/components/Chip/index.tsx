import { FC, HTMLAttributes, Ref, useMemo } from 'react';

import { composeClassNames as cn } from 'shared/helpers';

import s from './Chip.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  ref?: Ref<HTMLDivElement>;
  selected?: boolean;
  onClick?: () => void;
}

export const Chip: FC<Props> = ({
  className,
  label,
  ref,
  selected = false,
  onClick,
  ...restProps
}) => {
  const classNames = useMemo(
    () => cn(s.root, selected && s.rootSelected, className),
    [className, selected],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onClick) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      {...restProps}
      className={classNames}
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </div>
  );
};
