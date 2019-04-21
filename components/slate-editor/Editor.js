import React from 'react';
import HoverMenu from './HoverMenu';
import ControllMenu from './ControllMenu';
// Import the Slate editor.
import { Editor } from 'slate-react';
import { renderMark, renderNode } from './renderers';
import { initialValue } from './initial-value';
import Html from 'slate-html-serializer';
import { rules } from './rules';
import { Value } from 'slate';

const html = new Html({ rules })

export default class SlateEditor extends React.Component {
  state = {
    value: Value.create(),
    isLoaded: false
  }

  componentDidMount() {
    const valueFromProps = this.props.initialValue;
    const value = valueFromProps ? Value.fromJSON(html.deserialize(valueFromProps)) : Value.fromJSON(initialValue);

    this.updateMenu();
    this.setState({isLoaded: true, value});
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  onChange = ({ value }) => {
    this.setState({ value });
  }

  onKeyDown(event, change, next) {
    const {isLoading} = this.props;
    if(!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.save();
      return
    }

    next();
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
    const { value } = this.state;
    const fristBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = fristBlock && fristBlock.text ? fristBlock.text : 'No Title';
    const subtitle = secondBlock && secondBlock.text ? secondBlock.text : 'No Subtitle';

    return {
      title,
      subtitle
    }
  }

  save() {
    const { value } = this.state;
    const { save, isLoading } = this.props;
    const headingValues = this.getTitle();
    const text = html.serialize(value)

    !isLoading && save(text, headingValues)
  }

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor {...this.props}
                              value={value}
                              onChange={this.onChange}
                              onKeyDown={(event, change, next) => this.onKeyDown(event, change, next)}
                              renderMark={renderMark}
                              renderNode={renderNode}
                              renderEditor={this.renderEditor}
                              /> }
      </React.Fragment>
    )
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    const { isLoading } = this.props;
    return (
      <React.Fragment>
        <ControllMenu isLoading={isLoading} save={() => this.save()}></ControllMenu>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    )
  }
}