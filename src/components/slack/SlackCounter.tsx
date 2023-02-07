import React from 'react';
import { CounterObject, groupBy, Hover, HoverStyle } from '../../helpers';
import SlackCounterGroup from './SlackCounterGroup';
import SlackCSS from './SlackCSS';

export interface SlackCounterProps {
  counters?: CounterObject[];
  user?: string;
  onSelect?: (emoji: string) => void;
  onAdd?: () => void;
  disableAdd?: boolean;
  disableSlackCss?: boolean;
}

export const SlackCounter = React.forwardRef<HTMLDivElement, SlackCounterProps>(
  (
    {
      counters = defaultProps.counters,
      user = defaultProps.user,
      onSelect = defaultProps.onSelect,
      onAdd = defaultProps.onAdd,
      disableAdd = defaultProps.disableAdd,
      disableSlackCss = defaultProps.disableSlackCss,
    },
    ref
  ) => {
    const groups = groupBy(counters, 'emoji');

    return (
      <>
        {!disableSlackCss && <SlackCSS />}
        <Hover ref={ref} style={counterStyle}>
          {Object.keys(groups).map((emoji: string) => {
            const names = groups[emoji].map(({ by }: CounterObject) => {
              return by;
            });
            return (
              <div style={groupStyle} key={emoji}>
                <SlackCounterGroup
                  emoji={emoji}
                  count={names.length}
                  names={names}
                  active={names.includes(user)}
                  onSelect={onSelect}
                />
              </div>
            );
          })}
          {!disableAdd && (
            <HoverStyle
              hoverStyle={addStyleHover}
              style={addStyle}
              onClick={onAdd}
            >
              <SlackCounterGroup emoji={''} />
            </HoverStyle>
          )}
        </Hover>
      </>
    );
  }
);

export const defaultProps: Required<SlackCounterProps> = {
  counters: [
    {
      emoji: '👍',
      by: 'Case Sandberg',
    },
    {
      emoji: '👎',
      by: 'Charlie!!!!!',
    },
  ],
  user: 'Charlie',
  onSelect: (emoji: string) => {
    console.log(emoji);
  },
  onAdd: () => {
    console.log('add');
  },
  disableAdd: false,
  disableSlackCss: false,
};

const counterStyle = {
  display: 'flex',
};
const addStyle = {
  cursor: 'pointer',
  fontFamily: 'Slack',
  paddingLeft: '8px',
  opacity: '0',
  transition: 'opacity 0.1s ease-in-out',
};
const groupStyle = {
  marginRight: '4px',
};
const addStyleHover = {
  opacity: '1',
};

export default SlackCounter;
