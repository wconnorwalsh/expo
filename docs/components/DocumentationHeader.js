import styled, { keyframes, css } from 'react-emotion';
import Link from 'next/link';

import * as React from 'react';
import * as Constants from '~/common/constants';

import BrandLogo from '~/components/icons/BrandLogo';
import MenuIcon from '~/components/icons/Menu';
import DismissIcon from '~/components/icons/DismissIcon';
import AlgoliaSearch from '~/components/plugins/AlgoliaSearch';
import VersionSelector from '~/components/VersionSelector';

const STYLES_HIDE_MOBILE = css`
  @media screen and (max-width: ${Constants.breakpoints.mobile}) {
    display: none;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding-right: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const STYLES_RIGHT = css`
  min-width: 5%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const STYLES_NAV = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
  max-width: 1248px;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;

  @media screen and (max-width: ${Constants.breakpoints.mobile}) {
    padding: 0 16px 0 16px;
  }
`;

const STYLES_TITLE_TEXT = css`
  margin-left: 8px;
  font-size: 1.3rem;
  display: inline-block;
  padding-bottom: 2px;
  font-family: ${Constants.fonts.demi};

  @media screen and (max-width: 340px) {
    display: none;
  }
`;

const STYLES_MENU_BUTTON = css`
  cursor: pointer;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  padding-left: 24px;
  margin-left: 16px;
  border-left: 1px solid ${Constants.colors.border};
  text-decoration: none;
  color: ${Constants.colors.black};

  :visited {
    color: ${Constants.colors.black};
  }

  :hover {
    color: ${Constants.colors.expo};
  }

  @media screen and (max-width: ${Constants.breakpoints.mobile}) {
    display: flex;
    padding-left: 16px;
  }
`;

const STYLES_DISMISS_BUTTON = css`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 24px;
  margin-left: 16px;
  border-left: 1px solid ${Constants.colors.border};
  text-decoration: none;
  color: ${Constants.colors.black};

  :visited {
    color: ${Constants.colors.black};
  }

  :hover {
    color: ${Constants.colors.expo};
  }

  @media screen and (max-width: ${Constants.breakpoints.mobile}) {
    padding-left: 16px;
  }
`;

export default class DocumentationHeader extends React.PureComponent {
  render() {
    return (
      <header className={STYLES_NAV}>
        <div className={STYLES_LEFT}>
          <Link prefetch href="/versions">
            <a className="logo">
              <BrandLogo />
            </a>
          </Link>

          <h1 className={STYLES_TITLE_TEXT}>Expo Docs</h1>

          {!this.props.hideVersionSelector && (
            <VersionSelector
              className={STYLES_HIDE_MOBILE}
              style={{ marginLeft: 16 }}
              activeVersion={this.props.activeVersion}
              onSetVersion={this.props.onSetVersion}
            />
          )}
        </div>
        <div className={STYLES_RIGHT}>
          {!this.props.hideAlgoliaSearch && (
            <AlgoliaSearch router={this.props.router} activeVersion={this.props.activeVersion} />
          )}

          {!this.props.isMenuActive && (
            <Link
              prefetch
              href={`/mobile-navigation`}
              as={`/mobile-navigation/${this.props.activeVersion}`}>
              <a className={STYLES_MENU_BUTTON}>
                <MenuIcon />
              </a>
            </Link>
          )}

          {this.props.isMenuActive && (
            <span className={STYLES_DISMISS_BUTTON} onClick={() => window.history.back()}>
              <DismissIcon />
            </span>
          )}
        </div>
      </header>
    );
  }
}
