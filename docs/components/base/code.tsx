import { css } from '@emotion/core';
import { theme } from '@expo/styleguide';
import { Language, Prism } from 'prism-react-renderer';
import * as React from 'react';

import { installLanguages } from './languages';

import * as Constants from '~/constants/theme';

installLanguages(Prism);

const attributes = {
  'data-text': true,
};

const STYLES_CODE_BLOCK = css`
  color: ${theme.text.default};
  font-family: ${Constants.fontFamilies.mono};
  font-size: 13px;
  line-height: 20px;
  white-space: inherit;
  padding: 0px;
  margin: 0px;

  .code-annotation {
    transition: 200ms ease all;
    transition-property: text-shadow, opacity;
    text-shadow: ${theme.highlight.emphasis} 0px 0px 10px, ${theme.highlight.emphasis} 0px 0px 10px,
      ${theme.highlight.emphasis} 0px 0px 10px, ${theme.highlight.emphasis} 0px 0px 10px;
  }

  .code-annotation:hover {
    cursor: pointer;
    animation: none;
    opacity: 0.8;
  }

  .code-hidden {
    display: none;
  }

  .code-placeholder {
    opacity: 0.5;
  }
`;

const STYLES_INLINE_CODE = css`
  color: ${theme.text.default};
  font-family: ${Constants.fontFamilies.mono};
  font-size: 0.825em;
  white-space: pre-wrap;
  display: inline;
  padding: 2px 4px;
  line-height: 170%;
  max-width: 100%;

  word-wrap: break-word;
  background-color: ${theme.background.secondary};
  border: 1px solid ${theme.border.default};
  border-radius: 4px;
  vertical-align: middle;
  overflow-x: scroll;

  /* Disable Safari from adding border when used within a (perma)link */
  a & {
    border-color: ${theme.border.default};
  }
`;

const STYLES_CODE_CONTAINER = css`
  border: 1px solid ${theme.border.default};
  padding: 16px;
  margin: 16px 0;
  white-space: pre;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: ${theme.background.secondary};
  line-height: 120%;
  border-radius: 4px;
`;

type Props = {
  className?: string;
};

export class Code extends React.Component<Props> {
  componentDidMount() {
    this.runTippy();
  }

  componentDidUpdate() {
    this.runTippy();
  }

  private runTippy() {
    if (process.browser) {
      global.tippy('.code-annotation', {
        theme: 'expo',
        placement: 'top',
        arrow: true,
        arrowType: 'round',
        interactive: true,
        distance: 20,
      });
    }
  }

  private escapeHtml(text: string) {
    return text.replace(/"/g, '&quot;');
  }

  private replaceCommentsWithAnnotations(value: string) {
    return value
      .replace(/<span class="token comment">\/\* @info (.*?)\*\/<\/span>\s*/g, (match, content) => {
        return `<span class="code-annotation" title="${this.escapeHtml(content)}">`;
      })
      .replace(/<span class="token comment">\/\* @hide (.*?)\*\/<\/span>\s*/g, (match, content) => {
        return `<span><span class="code-hidden">%%placeholder-start%%</span><span class="code-placeholder">${this.escapeHtml(
          content
        )}</span><span class="code-hidden">%%placeholder-end%%</span><span class="code-hidden">`;
      })
      .replace(/<span class="token comment">\/\* @end \*\/<\/span>(\n *)?/g, '</span></span>');
  }

  render() {
    let html = this.props.children?.toString() || '';
    // mdx will add the class `language-foo` to codeblocks with the tag `foo`
    // if this class is present, we want to slice out `language-`
    let lang = this.props.className && this.props.className.slice(9).toLowerCase();

    // Allow for code blocks without a language.
    if (lang) {
      // sh isn't supported, use Use sh to match js, and ts
      if (lang in remapLanguages) {
        lang = remapLanguages[lang];
      }

      const grammar = Prism.languages[lang as keyof typeof Prism.languages];
      if (!grammar) {
        throw new Error(`docs currently do not support language: ${lang}`);
      }

      html = Prism.highlight(html, grammar, lang as Language);
      html = this.replaceCommentsWithAnnotations(html);
    }

    // Remove leading newline if it exists (because inside <pre> all whitespace is dislayed as is by the browser, and
    // sometimes, Prism adds a newline before the code)
    if (html.startsWith('\n')) {
      html = html.replace('\n', '');
    }

    return (
      <pre css={STYLES_CODE_CONTAINER} {...attributes}>
        <code css={STYLES_CODE_BLOCK} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    );
  }
}

const remapLanguages: Record<string, string> = {
  'objective-c': 'objc',
  sh: 'bash',
  rb: 'ruby',
};

export const InlineCode: React.FC = ({ children }) => (
  <code css={STYLES_INLINE_CODE} className="inline">
    {children}
  </code>
);
