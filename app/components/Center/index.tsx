import React, { ReactElement } from 'react';
export default ({
  children,
  isHorizon,
  isVertical,
  isAll
}: {
  children: ReactElement;
  isHorizon?: boolean;
  isVertical?: boolean;
  isAll?: boolean;
}) => <div className="center">{children}</div>;
