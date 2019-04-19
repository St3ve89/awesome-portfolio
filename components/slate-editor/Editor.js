import React from 'react';
import HoverMenu from './HoverMenu';
import ControllMenu from './ControllMenu';
// Import the Slate editor.
import { Editor } from 'slate-react';
import { renderMark, renderNode } from './renderers';
import { initialValue } from './initial-value';


export default class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoaded: false
  }

  componentDidMount() {
    this.updateMenu();
    this.setState({isLoaded: true});
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  getTitle() {
    return {
      title: 'Some title',
      subtitle: 'Some subtitle'
    }
  }

  save() {
    const { save } = this.props;
    const headingValues = this.getTitle();

    save(headingValues)
  }

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor {...this.props}
                              value={value}
                              onChange={this.onChange}
                              renderMark={renderMark}
                              renderNode={renderNode}
                              renderEditor={this.renderEditor}
                              /> }
      </React.Fragment>
    )
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        <ControllMenu save={() => this.save()}></ControllMenu>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    )
  }
}