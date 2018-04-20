import * as React from 'react';

interface IContentEditableProps {
    tagName: string;
    html: string;
    style: string;
    className: string;
    disabled: boolean;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
}

const stripNbsp = (str: string) => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');

class ContentEditable extends React.Component<IContentEditableProps> {
  htmlEl: React.RefObject<HTMLElement>;
  lastHtml: string;
  constructor(props: IContentEditableProps) {
    super(props);
    this.htmlEl = React.createRef<HTMLElement>();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    const { tagName, html, ...props } = this.props;

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref: this.htmlEl,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: html},
      },
      this.props.children);
  }

  shouldComponentUpdate(nextProps: IContentEditableProps) {
    const { props, htmlEl } = this;

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl.current) {
      return true;
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (
      stripNbsp(nextProps.html) !== stripNbsp(htmlEl.current.innerHTML) &&
      nextProps.html !== props.html
    ) {
      return true;
    }

    const optional = ['style', 'className', 'disabled', 'tagName'];

    // Handle additional properties
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if ( this.htmlEl.current && this.props.html !== this.htmlEl.current.innerHTML ) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.current.innerHTML = this.props.html;
    }
  }

  emitChange(evt: any) {
    if (!this.htmlEl.current) {
        return;
    }
    const html = this.htmlEl.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evnt: any = Object.assign({}, evt, {
        target: {
          value: html,
        },
      });
      this.props.onChange(evnt);
    }
    this.lastHtml = html;
  }
}

export default ContentEditable;
