import * as React from 'react';

export namespace ButtonProps {

  type ButtonState = 'ready' | 'not-allowed' | 'processing' | 'error' | 'success';
  type ButtonType = 'default' | 'primary' | 'positive' | 'negative' | 'flat';
  type ButtonSize = 'tiny' | 'small' | 'medium';

}

export type ButtonProps = {
    onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void,
    buttonState?: ButtonProps.ButtonState,
    label?: string | { [key in ButtonProps.ButtonState]: string },
    icon?:string | { [key in ButtonProps.ButtonState]: string },
    children?: string,
    type?: ButtonProps.ButtonType,
    primary?: boolean,
    flat?: boolean,
    size?: ButtonProps.ButtonSize,
    fluid?: boolean,
    circular?: boolean,
    textOverflow?: React.ComponentClass<object>, // todo(typo) when translate text overflow, update here its props types
    style?: React.CSSProperties,
    className?: string
  }

export default class Button extends React.PureComponent<ButtonProps, void> {}
