import * as React from 'react';
import some = require('lodash/some');
import * as bowser from 'bowser';

export namespace BrowserDetector {
  export type Browser = keyof bowser.IBowserVersions;
  export type DetectedBrowser = bowser.IBowserGrade;
  export type Props = {
    /** children node rendered when using a supported browser */
    children: JSX.Element;
    /** called when using a non-supported browser. Expected to return a valid ReactNode */
    placeholder: (detectedBrowser: DetectedBrowser) => JSX.Element;
    /** whitelist of supported browsers. If `undefined` they're all supported */
    supportedBrowsers?: Browser[];
    /** custom user-agent */
    userAgent?: string;
  };
}

/**
 * Top-level component which detects browser and renders children/placeholder
 * based on a given whitelist of supported browsers.
 */
export class BrowserDetector extends React.PureComponent<BrowserDetector.Props> {
  detectBrowser(userAgent: string): BrowserDetector.DetectedBrowser {
    return bowser._detect(userAgent);
  }

  shouldRenderPlaceholder(
    supportedBrowsers: BrowserDetector.Browser[],
    detectedBrowser: BrowserDetector.DetectedBrowser
  ): boolean {
    return supportedBrowsers && !some(supportedBrowsers, b => (detectedBrowser as any)[b]);
  }

  render() {
    const {
      props: { children, userAgent, supportedBrowsers = [], placeholder },
      shouldRenderPlaceholder,
      detectBrowser
    } = this;
    const detectedBrowser = detectBrowser(userAgent || window.navigator.userAgent);
    const shouldRenderChildren = !shouldRenderPlaceholder(supportedBrowsers, detectedBrowser);

    return shouldRenderChildren ? children : placeholder(detectedBrowser);
  }
}
